require_relative 'graph'

# O(|V|**2 + |E|).
def dijkstra1(source)
  shortest_paths = {}
  possible_paths = {
    source => {cost: 0, prev_edge: nil}
  }

  until possible_paths.empty?
    route = possible_paths.min_by do |source, details|
      details[:cost]
    end

    vertex = route[0]

    shortest_paths[vertex] = possible_paths[vertex]

    possible_paths.delete(vertex)

    vertex.out_edges.each do |out_edge|
      next if shortest_paths[out_edge.to_vertex]

      next if possible_paths[out_edge.to_vertex] && possible_paths[out_edge.to_vertex][:cost] <= (out_edge.cost + shortest_paths[vertex][:cost])

      possible_paths[out_edge.to_vertex] = {cost: (out_edge.cost + shortest_paths[vertex][:cost]), prev_edge: out_edge.from_vertex.value}
    end
  end



  shortest_paths
end
