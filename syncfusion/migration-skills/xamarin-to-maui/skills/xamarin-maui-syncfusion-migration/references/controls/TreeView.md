# TreeView Migration Mapping

## Control

- Xamarin: SfTreeView
- MAUI: SfTreeView

## Namespaces Mapping

- Syncfusion.XForms.TreeView -> Syncfusion.Maui.TreeView

## Properties Mapping

- HoldCommand -> LongPressCommand
- IsScrollBarVisible -> ScrollBarVisibility
- SelectionBackgroundColor -> SelectionBackground
- SelectionForegroundColor -> SelectionForeground

## Enums Mapping

- ItemType -> TreeViewItemType
- ExpandActionTarget -> TreeViewExpandActionTarget
- ExpanderPosition -> TreeViewExpanderPosition
- SelectionMode -> TreeViewSelectionMode
- AutoExpandMode -> TreeViewAutoExpandMode
- NotificationSubscriptionMode -> TreeViewNotificationSubscriptionMode

## Events Mapping

- ItemHolding -> ItemLongPress

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
