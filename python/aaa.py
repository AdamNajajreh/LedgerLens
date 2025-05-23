import bpy
import mathutils
import random

# --- Cleanup ---
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# --- Materials ---
def create_material(name, color):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    return mat

# Vibrant color palette for nodes
vibrant_colors = {
    "Red": (1.0, 0.0, 0.0),
    "Yellow": (1.0, 1.0, 0.0),
    "Blue": (0.0, 0.3, 1.0),
    "Green": (0.0, 0.8, 0.3),
    "Pink": (1.0, 0.3, 0.6),
    "Cyan": (0.0, 1.0, 1.0),
    "Orange": (1.0, 0.5, 0.0),
}

node_materials = {name: create_material(name, color) for name, color in vibrant_colors.items()}
edge_material = create_material("BlackEdge", (0.9, 0.9, 0.9))

# --- Parameters ---
num_nodes = 200
connection_threshold = 6.0
min_node_dist = 1
base_radius = 0.15
edge_radius = 0.03
spread = 14

# --- Generate node sizes (60% small, 30% medium, 10% large) ---
sizes = []
sizes += [base_radius] * int(num_nodes * 0.6)
sizes += [base_radius * 2] * int(num_nodes * 0.3)
sizes += [base_radius * 3] * int(num_nodes * 0.1)
random.shuffle(sizes)

# --- Place nodes with minimum distance ---
nodes = {}
attempts = 0
max_attempts = num_nodes * 50

while len(nodes) < num_nodes and attempts < max_attempts:
    pos = (
        random.uniform(-spread, spread),
        random.uniform(-spread, spread),
        random.uniform(-spread, spread)
    )
    valid = True
    for other_pos in nodes.values():
        if (mathutils.Vector(pos) - mathutils.Vector(other_pos[0])).length < min_node_dist:
            valid = False
            break
    if valid:
        name = f"N{len(nodes)}"
        nodes[name] = (pos, sizes[len(nodes)])
    attempts += 1

# --- Create node spheres with varying size and color ---
for name, (pos, radius) in nodes.items():
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=radius, 
        location=pos, 
        segments=64, 
        ring_count=32
    )

    obj = bpy.context.active_object
    obj.name = f"Node_{name}"
    color_name = random.choice(list(node_materials.keys()))
    obj.data.materials.append(node_materials[color_name])

# --- Create edges between nearby nodes ---
def create_edge(p1, p2, name):
    v1 = mathutils.Vector(p1)
    v2 = mathutils.Vector(p2)
    d = v2 - v1
    length = d.length
    midpoint = (v1 + v2) / 2

    bpy.ops.mesh.primitive_cylinder_add(radius=edge_radius, depth=length, location=midpoint)
    obj = bpy.context.active_object
    obj.name = name
    obj.rotation_mode = 'QUATERNION'
    obj.rotation_quaternion = d.to_track_quat('Z', 'Y')
    obj.data.materials.append(edge_material)

created = set()
node_list = list(nodes.items())

for i in range(len(node_list)):
    name_i, (pos_i, _) = node_list[i]
    for j in range(i + 1, len(node_list)):
        name_j, (pos_j, _) = node_list[j]
        dist = (mathutils.Vector(pos_i) - mathutils.Vector(pos_j)).length
        if dist < connection_threshold:
            key = tuple(sorted([name_i, name_j]))
            if key not in created:
                create_edge(pos_i, pos_j, f"Edge_{name_i}_{name_j}")
                created.add(key)

# --- Export to GLB ---
bpy.ops.export_scene.gltf(
    filepath="C:\\Users\\jurko\\LedgerLens\\python\\graph.glb",
    export_format='GLB',
    export_apply=True,
    export_materials='EXPORT',
    export_cameras=False,
    export_lights=False
)
