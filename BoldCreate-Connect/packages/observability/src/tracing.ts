import { context, trace, SpanStatusCode, type Span } from '@opentelemetry/api';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';

export interface Tracing {
  /** True when spans are exported over OTLP; false when tracing only provides local context. */
  exporting: boolean;
  shutdown(): Promise<void>;
}

/**
 * Starts tracing. Without an endpoint no exporter is installed: spans still carry ids (so logs
 * can correlate) but nothing leaves the process. W3C `traceparent` propagation is the default.
 */
export function initTracing(options: { service: string; endpoint?: string }): Tracing {
  if (options.endpoint) {
    const sdk = new NodeSDK({
      serviceName: options.service,
      spanProcessors: [
        new BatchSpanProcessor(new OTLPTraceExporter({ url: `${options.endpoint}/v1/traces` })),
      ],
    });
    sdk.start();
    return { exporting: true, shutdown: () => sdk.shutdown() };
  }
  const tracerSetup = new NodeTracerProvider({ spanProcessors: [] });
  tracerSetup.register();
  return {
    exporting: false,
    async shutdown() {
      await tracerSetup.shutdown();
      trace.disable();
      context.disable();
    },
  };
}

/** Runs `fn` inside a span; records the error and rethrows when it fails. */
export async function withSpan<T>(name: string, fn: (span: Span) => Promise<T> | T): Promise<T> {
  return trace.getTracer('boldcreate').startActiveSpan(name, async (span) => {
    try {
      return await fn(span);
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  });
}
