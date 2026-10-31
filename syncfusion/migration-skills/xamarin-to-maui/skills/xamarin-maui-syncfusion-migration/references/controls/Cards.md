# Cards Migration Mapping

## Control

- Xamarin: SfCard
- MAUI: SfCard

## Namespaces Mapping

- Syncfusion.SfCards.XForms -> Syncfusion.Maui.Cards

## Initialize control Mapping

- using Syncfusion.Cards.XForms; ... SfCardView cardView = new SfCardView(); //set Content for card view cardView.Content = new Label(){ Text="SfCardView" }; this.Content = cardView; -> using Syncfusion.Maui.Cards; ... SfCardView cardView = new SfCardView(); cardView.Content = new Label(){ Text="SfCardView" }; this.Content = cardView;

## Properties Mapping

- Nil -> BorderWidth
- Nil -> BorderColor
- IsDismissed -> IsDismissed
- CornerRadius -> CornerRadius
- IndicatorColor -> IndicatorColor
- IndicatorThickenss -> IndicatorThickenss
- IndicatorPosition -> IndicatorPosition
- SwipeToDismiss -> SwipeToDismiss
- FadeOutOnSwiping -> FadeOutOnSwiping
- SwipeDirection -> SwipeDirection
- ShowSwipedCard -> ShowSwipedCard
- VisibleCardIndex -> VisibleIndex
- Nil -> VerticalCardSpacing
- Nil -> HorizontalCardSpacing

## Events Mapping

- CardTapped -> Tapped
- VisibleCardIndexChanged -> VisibleIndexChanged
- VisibleCardIndexChanging -> VisibleIndexChanging
- Dismissed -> Dismissed
- Dismissing -> Dismissing

## Methods Mapping

- Forward -> Forward
- Backward -> Backward

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
