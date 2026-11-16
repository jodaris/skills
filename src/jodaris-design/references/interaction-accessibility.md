# Interaction and accessibility

Use this reference for task flows, forms, navigation, overlays, tables and localization.

## Controls and focus

Use links for navigation and buttons for actions. Prefer native semantics and established accessible primitives. Give icon controls meaningful accessible names; hide purely decorative icons from assistive technology. Keep visible focus and logical keyboard order, with no focused control obscured by a sticky region.

Use comfortably sized hit areas; aim for 44 CSS pixels for touch controls where the layout permits. For dense interfaces, meet the project's accessibility target through appropriate size and spacing. Hover must not be the only way to discover information or operate an action. Provide keyboard and simple pointer alternatives to dragging or complex gestures.

## Forms and feedback

Group label, input, help and error together. Keep visible labels; placeholders are examples, not names. Choose appropriate input types and autocomplete. Support paste, password managers and ordinary browser editing. Preserve submitted values after recoverable errors.

Make validation specific and actionable. Associate errors with their fields and direct focus to a useful correction on failed submission. Announce important asynchronous status without repeatedly interrupting or moving focus. Avoid duplicate submission while a request is pending; keep its action understandable with a text label and a stable layout. Choose validation timing to suit the field and task rather than imposing one strategy everywhere.

Model initial loading separately from refresh: retain useful data during refresh, distinguish an empty collection from no filter matches, and offer an appropriate recovery after failure. A destructive or costly action needs the project's confirmation or undo pattern. Design its explanation here; the underlying authorization decision belongs elsewhere.

## Dialogs, menus and navigation

Use the existing overlay primitive's keyboard/focus behavior. A modal needs a name, appropriate description, intentional initial focus, containment, a reachable dismissal action and focus return. Bound its body to the viewport and let short screens scroll. Follow the project's policy for blocking operations without leaving users in a focus trap. Nested popovers/selects must remain reachable inside the dialog.

Keep navigation destinations and active location clear. Use URL state when filters, tabs or paging should support sharing and Back/Forward; do not serialize sensitive form drafts into the URL. Preserve native link behavior. Menus, tabs and comboboxes have different keyboard contracts; use the primitive appropriate to the task instead of inventing one.

## Dense content and localization

Keep table headers, selection, row actions and pagination understandable through loading and empty states. Preserve access to critical actions on narrow screens. A card alternative should retain essential information, not silently drop fields or permissions.

Test long labels, enlarged text, supported locales and mixed-direction content. Use locale-aware number/date formatting and logical spacing; mirror directional navigation when appropriate, while keeping logos, code and nondirectional icons intentional. Check error expansion and action wrapping in both reading directions. Use the project's actual light/dark selectors rather than assuming an OS preference sets application appearance.
