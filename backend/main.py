from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    
    Kahn's algorithm performs a topological sort. If all nodes are processed,
    the graph is a DAG. If not, there's a cycle.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree map
    graph = defaultdict(list)
    in_degree = {node['id']: 0 for node in nodes}
    
    # Build the graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        if source and target:
            graph[source].append(target)
            in_degree[target] = in_degree.get(target, 0) + 1
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id, degree in in_degree.items() if degree == 0])
    processed_count = 0
    
    # Process nodes with in-degree 0
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, it's a DAG
    return processed_count == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse pipeline data and return statistics.
    
    Returns:
        - num_nodes: Number of nodes in the pipeline
        - num_edges: Number of edges in the pipeline
        - is_dag: Boolean indicating if the pipeline is a Directed Acyclic Graph
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    dag_check = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_check
    }
