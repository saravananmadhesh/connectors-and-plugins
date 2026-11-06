# End-User Capabilities Guide

Learn what users can do with the Angular Image Editor interface.

## Table of Contents
- [Opening Images](#opening-images)
- [Viewing and Navigation](#viewing-and-navigation)
- [Image Manipulation](#image-manipulation)
- [Annotations](#annotations)
- [Effects and Filters](#effects-and-filters)
- [Image Operations](#image-operations)
- [Exporting Results](#exporting-results)

## Opening Images

Users can add images to the editor by:

- **File Upload**: Click "Open" toolbar button to browse and select images
- **Drag and Drop**: Drag image files directly onto the editor canvas
- **URL**: Paste image URLs in the open dialog
- **Recent Images**: Access previously edited images from history

### Supported Formats
- **JPEG** (.jpg, .jpeg) - Best for photos
- **PNG** (.png) - Supports transparency
- **SVG** (.svg) - Vector graphics
- **WebP** (.webp) - Modern web format
- **BMP** (.bmp) - Legacy format

**File Size Limits:**
- Minimum: 100 × 100 pixels
- Maximum: 5000 × 5000 pixels (configurable)
- File size: Up to 50MB (configurable)

## Viewing and Navigation

### Zoom Controls

Users can zoom images using:
- **Toolbar buttons**: "+" and "-" buttons
- **Preset zoom levels**: 25%, 50%, 100%, 150%, 200%
- **Fit to Width**: Auto-fit horizontal dimension
- **Fit to Height**: Auto-fit vertical dimension
- **Fit to Window**: Show entire image
- **Mouse wheel**: Scroll to zoom in/out
- **Keyboard**: Ctrl+Plus (zoom in), Ctrl+Minus (zoom out)

### Panning

When zoomed beyond canvas size:
- **Click and drag** on the image to pan
- **Arrow keys** to move viewport
- **Hand cursor** indicates pannable area

### Reset View

- **Reset Zoom**: Returns to 100% zoom
- **Fit to Canvas**: Auto-scales to fit available space

## Image Manipulation

### Rotation and Flipping

**Rotate:**
- Rotate Left (90° counter-clockwise)
- Rotate Right (90° clockwise)
- Rotate 180°

**Flip:**
- Flip Horizontal (mirror left-right)
- Flip Vertical (mirror top-bottom)
- Flip Both (180° rotation alternative)

**Straighten:**
- Fine-tune angle from -45° to +45°
- Remove camera tilt from photos

### Cropping

Users can crop images:

1. **Select Crop Tool** from toolbar
2. **Draw crop area** on image (freeform or preset ratio)
3. **Adjust corners** to refine selection
4. **Apply Crop** when satisfied

**Preset Ratios:**
- Custom (free form)
- Square (1:1)
- 3×2 (landscape photos)
- 2×3 (portrait)
- 16×9 (widescreen)
- 4×3 (standard)
- 9×16 (mobile)

### Straightening

Drag straighten slider to align tilted images:
- Range: -45° to +45°
- Live preview shows result
- Apply to commit changes

## Annotations

### Text Annotations

Users can add text to images:
1. Click "Text" annotation tool
2. Click on image to place text
3. Type message
4. Customize:
   - Font family, size, and weight
   - Color and opacity
   - Alignment (left, center, right)
   - Underline and strikethrough

### Drawing Annotations

**Freehand Drawing:**
- Sketch freely on image
- Adjust brush size and color
- Draw multiple strokes

**Shape Annotations:**
- Rectangle, Ellipse, Line, Arrow
- Path drawing (connected lines)
- Customize stroke color and width

### Image Annotations

Overlay images on current image:
- Add watermarks
- Combine multiple images
- Position and scale overlay

### Annotation Management

- **Select** existing annotations (click on them)
- **Move** annotations (drag)
- **Resize** annotations (corner handles)
- **Delete** annotations (select + Delete key)
- **Undo/Redo** annotation changes (Ctrl+Z, Ctrl+Y)

## Effects and Filters

### Preset Filters

Apply one-click effects:
- **Warm**: Adds warm tones to image
- **Cold**: Adds cool/blue tones
- **Sepia**: Vintage brown tone
- **Chrome**: Bright metallic effect
- **Invert**: Inverts all colors
- **Grayscale**: Black and white
- **BlackAndWhite**: High-contrast B&W

### Fine-Tuning Adjustments

Adjust image properties with sliders:

| Parameter | Range | Use Case |
|-----------|-------|----------|
| **Brightness** | 0-100 | Lighten/darken image |
| **Contrast** | 0-100 | Increase/decrease tonal range |
| **Saturation** | 0-100 | Boost or reduce color intensity |
| **Hue** | 0-360° | Shift color tone |
| **Exposure** | 0-100 | Brighten shadows/reduce highlights |
| **Blur** | 1-100 | Add blur effect |
| **Opacity** | 0-100 | Image transparency |

### Custom Presets

Save and reuse adjustment combinations:
1. Adjust filters and fine-tuning
2. Save current settings as preset
3. Apply preset to other images

## Image Operations

### Frames

Add decorative borders:
- **Mat Frame**: Solid color border
- **Bevel Frame**: 3D beveled edge
- **Line Frame**: Simple line border
- **Hook Frame**: Vintage corner hooks
- **Inset Frame**: Inset depth effect

Customize frame:
- Color and gradient options
- Border size and width
- Corner styles
- Shadow and offset

### Redaction (Privacy Protection)

Hide sensitive information:

**Blur Redaction:**
- Pixelate area to obscure details
- Useful for faces, license plates, text

**Solid Redaction:**
- Cover with solid color bar
- Ideal for names, addresses, amounts

**Strikethrough Redaction:**
- Cross out sensitive text
- Shows removal intent

### Z-Order (Layering)

Manage annotation stacking:
- **Bring Forward**: Move up one layer
- **Send Backward**: Move down one layer
- **Bring to Front**: Move to top
- **Send to Back**: Move to bottom

## Exporting Results

### Export Options

Users can save edited images as:

**Image Formats:**
- JPEG (adjustable quality)
- PNG (preserves transparency)
- SVG (vector-based)
- WebP (modern format)
- BMP (legacy format)

**Output Methods:**
- **Download**: Save to computer
- **Copy**: Copy to clipboard
- **Share**: Generate shareable link
- **Print**: Direct print

### Export Settings

**JPEG/WebP Quality:**
- Range: 0-100%
- Higher quality = larger file size
- Recommended: 85-95% for best balance

**PNG Options:**
- Preserves transparency
- No quality loss
- Larger file sizes

**Watermarking:**
- Add watermark during export
- Text or image watermark
- Adjustable opacity and position

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl++ | Zoom in |
| Ctrl+- | Zoom out |
| Ctrl+0 | Reset zoom |
| Delete | Delete selected annotation |
| Arrow Keys | Pan when zoomed |
| Escape | Deselect tool |

## Best Practices for Users

1. **Start with basics**: Crop and straighten before advanced edits
2. **Use presets**: Filters and presets save time
3. **Zoom appropriately**: 100% zoom for precise work
4. **Undo liberally**: Use undo/redo to experiment
5. **Save versions**: Export multiple formats for different uses
6. **Test on target**: Verify output on intended platform (web, print, etc.)

## Common User Tasks

**Task: Prepare photo for website**
1. Open original photo
2. Crop to 16:9 ratio
3. Apply warm filter
4. Increase saturation by 20%
5. Export as WebP at 85% quality

**Task: Create social media thumbnail**
1. Open image
2. Crop to 1:1 (square)
3. Add text annotation with caption
4. Apply chrome filter
5. Export as PNG

**Task: Remove sensitive information**
1. Open image
2. Select redaction tool (blur)
3. Draw over sensitive areas
4. Apply to all areas
5. Export as JPEG

**Task: Create collage**
1. Open base image
2. Add multiple image annotations
3. Position and scale each
4. Add text labels
5. Export final composition
