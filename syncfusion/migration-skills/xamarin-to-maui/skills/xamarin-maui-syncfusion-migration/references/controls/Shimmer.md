# Shimmer Migration Mapping

## Control

- Xamarin: SfShimmer
- MAUI: SfShimmer

## Namespaces Mapping

- Syncfusion.XForms.Shimmer -> Syncfusion.Maui.Shimmer

## Initialize control Mapping

- using Syncfusion.XForms.Shimmer; ... SfShimmer shimmer = new SfShimmer(); this.Content = shimmer; -> using Syncfusion.Maui.Shimmer; ... SfShimmer shimmer = new SfShimmer(); this.Content = shimmer;

## Classes Mapping

- ShimmerView -> ShimmerView

## Properties Mapping

- using Syncfusion.SfShimmer.XForms; ... SfShimmer shimmer = new SfShimmer(); this.Content = shimmer; shimmer.VerticalOptions = LayoutOptions.Fill; shimmer.SetBinding(SfShimmer.IsActiveProperty, "IsActive"); var stackLayout = new StackLayout(); var label = new Label(); label.Text = "Content is loaded!"; label.HorizontalOptions = LayoutOptions.CenterAndExpand; label.VerticalOptions = LayoutOptions.CenterAndExpand; stackLayout.Children.Add(label); shimmer.Content = stackLayout; -> using Syncfusion.Maui.Shimmer; ... SfShimmer shimmer = new SfShimmer(); this.Content = shimmer; shimmer.VerticalOptions = LayoutOptions.FillAndExpand; var stackLayout = new StackLayout(); var label = new Label(); label.Text = "Content is loaded!"; label.HorizontalOptions = LayoutOptions.Fill; label.VerticalOptions = LayoutOptions.Fill; stackLayout.Children.Add(label);
- Content -> Nil
- CustomView -> CustomView
- WaveDirection -> WaveDirection
- Type -> Type
- Color -> Fill
- WaveColor -> WaveColor
- WaveWidth -> WaveWidth
- AnimationDuration -> AnimationDuration
- IsActive -> IsActive
- Nil -> RepeatCount
- BackgroundColor -> Nil
- CornerRadius -> Nil
- Nil -> ShapeType

## Enums Mapping

- WaveDirection -> ShimmerWaveDirection
- ShimmerTypes -> ShimmerType
- Nil -> ShimmerShapeType

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
