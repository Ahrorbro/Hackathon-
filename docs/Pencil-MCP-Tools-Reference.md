# Pencil MCP — Design Tools Reference (One by One)

**Status:** Pencil MCP is **connected** and working.  
**Server:** `project-0-Hackathon new project-pencil`  
**Total tools:** 90

---

## 1. File & document

| # | Tool | Purpose |
|---|------|--------|
| 1 | `open_file` | Open a .fig file for editing (call before other tools). |
| 2 | `save_file` | Save the current .fig document. |
| 3 | `new_document` | Create a new document. |

---

## 2. Pages

| # | Tool | Purpose |
|---|------|--------|
| 4 | `list_pages` | List all pages in the document. |
| 5 | `get_current_page` | Get the current page. |
| 6 | `switch_page` | Switch to a page by ID. |
| 7 | `create_page` | Create a new page. |
| 8 | `page_bounds` | Get bounds of a page. |
| 9 | `get_page_tree` | Get the node tree for a page. |

---

## 3. Nodes — read & select

| # | Tool | Purpose |
|---|------|--------|
| 10 | `get_node` | Get a node by ID. |
| 11 | `find_nodes` | Find nodes (e.g. by name, type). |
| 12 | `get_selection` | Get currently selected nodes. |
| 13 | `select_nodes` | Set selection by node IDs. |
| 14 | `node_tree` | Get tree structure for a node. |
| 15 | `node_children` | Get children of a node. |
| 16 | `node_ancestors` | Get ancestors of a node. |
| 17 | `node_bounds` | Get bounds of a node. |
| 18 | `node_bindings` | Get variable bindings on a node. |

---

## 4. Nodes — create

| # | Tool | Purpose |
|---|------|--------|
| 19 | `create_shape` | Create shape: FRAME, RECTANGLE, ELLIPSE, TEXT, LINE, STAR, POLYGON, SECTION. |
| 20 | `create_component` | Create a component. |
| 21 | `create_instance` | Create an instance of a component. |
| 22 | `create_vector` | Create a vector/path. |
| 23 | `create_slice` | Create a slice. |
| 24 | `clone_node` | Clone a node. |

---

## 5. Nodes — modify

| # | Tool | Purpose |
|---|------|--------|
| 25 | `update_node` | Update node properties. |
| 26 | `rename_node` | Rename a node. |
| 27 | `delete_node` | Delete a node. |
| 28 | `node_move` | Move node position. |
| 29 | `node_resize` | Resize a node. |
| 30 | `reparent_node` | Move node to another parent. |
| 31 | `group_nodes` | Group nodes. |
| 32 | `ungroup_node` | Ungroup a group. |
| 33 | `flatten_nodes` | Flatten nodes. |
| 34 | `node_to_component` | Convert node(s) to component. |
| 35 | `node_replace_with` | Replace node with another. |
| 36 | `arrange` | Arrange nodes (order, alignment). |

---

## 6. Styling — fill, stroke, effects

| # | Tool | Purpose |
|---|------|--------|
| 37 | `set_fill` | Set fill (solid, gradient, etc.). |
| 38 | `set_stroke` | Set stroke. |
| 39 | `set_stroke_align` | Set stroke alignment. |
| 40 | `set_effects` | Set effects (e.g. shadow, blur). |
| 41 | `set_opacity` | Set opacity. |
| 42 | `set_blend` | Set blend mode. |
| 43 | `set_radius` | Set corner radius. |
| 44 | `set_visible` | Set visibility. |
| 45 | `set_locked` | Set locked state. |

---

## 7. Text

| # | Tool | Purpose |
|---|------|--------|
| 46 | `set_text` | Set text content. |
| 47 | `set_font` | Set font. |
| 48 | `set_font_range` | Set font for a range. |
| 49 | `set_text_properties` | Set text properties. |
| 50 | `set_text_resize` | Set text resize behavior. |
| 51 | `list_fonts` | List available fonts. |

---

## 8. Layout

| # | Tool | Purpose |
|---|------|--------|
| 52 | `set_layout` | Set layout (auto-layout, etc.). |
| 53 | `set_layout_child` | Set layout properties of a child. |
| 54 | `set_constraints` | Set constraints. |
| 55 | `set_minmax` | Set min/max width/height. |

---

## 9. Transform

| # | Tool | Purpose |
|---|------|--------|
| 56 | `set_rotation` | Set rotation. |
| 57 | `path_get` | Get path data. |
| 58 | `path_set` | Set path data. |
| 59 | `path_move` | Move path. |
| 60 | `path_scale` | Scale path. |
| 61 | `path_flip` | Flip path. |
| 62 | `boolean_union` | Boolean union on paths. |
| 63 | `boolean_subtract` | Boolean subtract. |
| 64 | `boolean_intersect` | Boolean intersect. |
| 65 | `boolean_exclude` | Boolean exclude. |

---

## 10. Variables & collections

| # | Tool | Purpose |
|---|------|--------|
| 66 | `create_variable` | Create a variable. |
| 67 | `get_variable` | Get a variable. |
| 68 | `set_variable` | Set variable value. |
| 69 | `delete_variable` | Delete a variable. |
| 70 | `find_variables` | Find variables. |
| 71 | `list_variables` | List variables. |
| 72 | `bind_variable` | Bind variable to a node property. |
| 73 | `create_collection` | Create a collection. |
| 74 | `get_collection` | Get a collection. |
| 75 | `delete_collection` | Delete a collection. |
| 76 | `list_collections` | List collections. |

---

## 11. Viewport & export

| # | Tool | Purpose |
|---|------|--------|
| 77 | `viewport_get` | Get current viewport. |
| 78 | `viewport_set` | Set viewport. |
| 79 | `viewport_zoom_to_fit` | Zoom viewport to fit. |
| 80 | `export_svg` | Export nodes as SVG. |
| 81 | `export_image` | Export as image. |
| 82 | `render` | Render node(s) (e.g. to image). |

---

## 12. Components

| # | Tool | Purpose |
|---|------|--------|
| 83 | `get_components` | Get components in the document. |

---

## 13. Analysis

| # | Tool | Purpose |
|---|------|--------|
| 84 | `analyze_colors` | Analyze color palette usage on the page. |
| 85 | `analyze_typography` | Analyze typography. |
| 86 | `analyze_spacing` | Analyze spacing. |
| 87 | `analyze_clusters` | Analyze clusters (e.g. similar colors). |

---

## 14. Diff & eval

| # | Tool | Purpose |
|---|------|--------|
| 88 | `diff_create` | Create a diff between states. |
| 89 | `diff_show` | Show a diff. |
| 90 | `eval` | Run eval (e.g. expressions). |

---

## Quick workflow

1. **Open file:** `open_file` with path to your `.fig` file.  
2. **Read structure:** `list_pages`, `get_page_tree`, `find_nodes`, `get_node`.  
3. **Create/edit:** `create_shape`, `create_component`, `update_node`, `set_fill`, `set_text`, etc.  
4. **Export:** `export_svg` or `export_image`.  
5. **Save:** `save_file`.

All design tools are available one by one as listed above; use them from the Pencil MCP server in Cursor.
