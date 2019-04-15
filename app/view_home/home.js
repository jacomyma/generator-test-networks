'use strict';

angular.module('gentestnet.view_home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view_home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', function($scope, $timeout) {
  // var gexf = graphology.library.gexf;

  $scope.nodes = 100
  $scope.g
  $scope.generator = 'clique'
  $scope.$watch('generator', function(){
    generateNetwork()
  })
  $scope.$watch('nodes', function(){
    generateNetwork()
  })

  function generateNetwork() {
    $scope.g = undefined
    $timeout(function(){
      $scope.g = generate($scope.generator, $scope.nodes)
    }, 500)
  }

  function generate(generator_type, min_order) {
    switch (generator_type) {

      case 'clique':
        return generateClique(min_order)
        break;

      case 'stable':
        return generateStable(min_order)
        break;

      case 'star':
        return generateStar(min_order)
        break;

      case 'chain':
        return generateChain(min_order)
        break;

      case 'circle':
        return generateCircle(min_order)
        break;

      case 'trilattice':
        return generateTriangularLattice(min_order)
        break;

      case 'sqlattice':
        return generateSquareLattice(min_order, 1)
        break;

      case 'sqlattice2':
        return generateSquareLattice(min_order, 2)
        break;

      case 'sqlattice5':
        return generateSquareLattice(min_order, 5)
        break;

      case 'clique2-bridge1':
        return generateBridgedCliques(min_order, 2, 1)
        break;

      case 'clique3-bridge1':
        return generateBridgedCliques(min_order, 3, 1)
        break;

      case 'clique5-bridge1':
        return generateBridgedCliques(min_order, 5, 1)
        break;

      case 'clique2-bridge5':
        return generateBridgedCliques(min_order, 2, 5)
        break;

      case 'star2-bridge':
        return generateBridgedStars(min_order, 2)
        break;

      case 'star3-bridge':
        return generateBridgedStars(min_order, 3)
        break;

      case 'star5-bridge':
        return generateBridgedStars(min_order, 5)
        break;

      case 'lattice2-bridge':
        return generateBridgedLattices(min_order, 2)
        break;

      case 'lattice5-bridge':
        return generateBridgedLattices(min_order, 5)
        break;

      case 'random-75':
        return random(min_order, 0.75)
        break;

      case 'random-50':
        return random(min_order, 0.50)
        break;

      case 'random-25':
        return random(min_order, 0.25)
        break;

      case 'random-5':
        return random(min_order, 0.05)
        break;

      case 'random-1':
        return random(min_order, 0.01)
        break;

      case 'SBM2-99-999':
        var p_in = 0.99999
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-99-99':
        var p_in = 0.9999
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-99-9':
        var p_in = 0.999
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-99':
        var p_in = 0.99
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-95':
        var p_in = 0.95
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-90':
        var p_in = 0.90
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-80':
        var p_in = 0.80
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-70':
        var p_in = 0.70
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM2-60':
        var p_in = 0.60
        return generateSBM(min_order, 2, p_in, 1-p_in)
        break;

      case 'SBM5-99-999':
        var p_in = 0.99999
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-99-99':
        var p_in = 0.9999
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-99-9':
        var p_in = 0.999
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-99':
        var p_in = 0.99
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-95':
        var p_in = 0.95
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-90':
        var p_in = 0.90
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-80':
        var p_in = 0.80
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-70':
        var p_in = 0.70
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'SBM5-60':
        var p_in = 0.60
        return generateSBM(min_order, 5, p_in, 1-p_in)
        break;

      case 'recursiveClusters3':
        return generateRecursiveClusters(min_order, 3)
        break;

      case 'recursiveClusters5':
        return generateRecursiveClusters(min_order, 5)
        break;

      default:
        alert("This generator is not yet implemented")
        break;
    }
  }

  function generateClique(order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var i, j
    for (i=0; i<order; i++){
      g.addNode('n'+i, {
        // No attributes
      })
      for (j=0; j<i; j++) {
        g.addEdge('n'+i, 'n'+j)
      }
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Clique '+order)
    g.setAttribute('description', 'All nodes are connected together')
    return g
  }

  function generateStable(order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var i, j
    for (i=0; i<order; i++){
      g.addNode('n'+i, {
        // No attributes
      })
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Stable '+order)
    g.setAttribute('description', 'There are no links')
    return g
  }

  function generateStar(order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    g.addNode('n0', {
      type: 'center'
    })
    var i
    for (i=1; i<order; i++){
      g.addNode('n'+i, {
        type: 'leave'
      })
      g.addEdge('n0', 'n'+i)
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Star '+order)
    g.setAttribute('description', 'One center nodes and the other nodes are only connected to that one')
    return g
  }

  function generateChain(order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var i
    for (i=0; i<order; i++){
      g.addNode('n'+i, {
        type: (i>0 && i<order-1) ? ('chainlink') : ('end')
      })
      if (i>0) {
        g.addEdge('n'+i, 'n'+(i-1))
      }
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Chain '+order)
    g.setAttribute('description', 'Each node has two neighbors except at each end of the chain')
    return g
  }

  function generateCircle(order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var i
    for (i=0; i<order; i++){
      g.addNode('n'+i, {
        // No attributes
      })
    }
    g.addEdge('n0', 'n'+(order-1))
    for (i=1; i<order; i++){
      g.addEdge('n'+i, 'n'+(i-1))
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Circle '+order)
    g.setAttribute('description', 'Each node has two neighbors, in a circular chain')
    return g
  }

  function generateSquareLattice(min_order, grid_scale) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    g.addNode('r0c0', {
      row: 0,
      col: 0,
      type: 'intersection'
    })
    var rank = 1
    while (g.order < min_order || (rank-1)%grid_scale != 0) {
      var i
      for (i=0; i<rank; i++) {
        if (rank%grid_scale == 0 || i%grid_scale == 0) {
          g.addNode('r'+rank+'c'+i, {
            row: rank,
            col: i,
            type: (rank%grid_scale==0 && i%grid_scale==0) ? ('intersection') : ('connexion')
          })
          g.addNode('r'+i+'c'+rank, {
            row: i,
            col: rank,
            type: (rank%grid_scale==0 && i%grid_scale==0) ? ('intersection') : ('connexion')
          })
          if ((rank-1)%grid_scale == 0 || i%grid_scale == 0) {
            g.addEdge('r'+rank+'c'+i, 'r'+(rank-1)+'c'+i)
            g.addEdge('r'+i+'c'+rank, 'r'+i+'c'+(rank-1))
          }
          if (i>0 && (rank%grid_scale == 0 || (i-1)%grid_scale == 0)) {
            g.addEdge('r'+rank+'c'+i, 'r'+rank+'c'+(i-1))
            g.addEdge('r'+i+'c'+rank, 'r'+(i-1)+'c'+rank)          
          }
        }
      }

      if (rank%grid_scale == 0) {
        g.addNode('r'+rank+'c'+rank, {
          row: rank,
          col: rank,
          type: 'intersection'
        })
        g.addEdge('r'+rank+'c'+rank, 'r'+rank+'c'+(rank-1))
        g.addEdge('r'+rank+'c'+rank, 'r'+(rank-1)+'c'+rank)
      }
      rank++
    }
    if (grid_scale==1) {
      g.nodes().forEach(function(nid){
        if (g.degree(nid) == 4) {
          g.setNodeAttribute(nid, 'type', 'normal')
        } else if (g.degree(nid) == 3) {
          g.setNodeAttribute(nid, 'type', 'border')          
        } else if (g.degree(nid) == 2) {
          g.setNodeAttribute(nid, 'type', 'corner')          
        }
      })
      g.setAttribute('creator', 'Generator of test networks')
      g.setAttribute('name', 'Square Lattice '+g.order)
      g.setAttribute('description', 'A grid of nodes. Except at the border, each node has four neighbors.')
    } else {
      g.nodes().forEach(function(nid){
        if (g.getNodeAttribute(nid, 'type') == 'intersection') {
          if (g.degree(nid) == 3) {
            g.setNodeAttribute(nid, 'type', 'intersection-border')          
          } else if (g.degree(nid) == 2) {
            g.setNodeAttribute(nid, 'type', 'intersection-corner')          
          }
        }
      })
      g.setAttribute('creator', 'Generator of test networks')
      g.setAttribute('name', 'Square Lattice Length='+grid_scale+' '+g.order)
      g.setAttribute('description', 'A grid of nodes connected by paths of length '+grid_scale)
    }
    return g
  }

  function generateTriangularLattice(min_order) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    g.addNode('r0c0', {
      row: 0,
      col: 0
    })
    var rank = 1
    while (g.order < min_order) {
      var i
      for (i=0; i<=rank; i++) {
        g.addNode('r'+rank+'c'+i, {
          row: rank,
          col: i
        })
        if (i>0) {
          g.addEdge('r'+rank+'c'+i, 'r'+rank+'c'+(i-1))
          g.addEdge('r'+rank+'c'+i, 'r'+(rank-1)+'c'+(i-1))
        }
        if (i<rank) {
          g.addEdge('r'+rank+'c'+i, 'r'+(rank-1)+'c'+i)
        }
      }
      rank++
    }
    g.nodes().forEach(function(nid){
      if (g.degree(nid) == 6) {
        g.setNodeAttribute(nid, 'type', 'normal')
      } else if (g.degree(nid) == 4) {
        g.setNodeAttribute(nid, 'type', 'border')
      } else if (g.degree(nid) == 2) {
        g.setNodeAttribute(nid, 'type', 'corner')
      }
    })
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Triangular Lattice '+g.order)
    g.setAttribute('description', 'A grid of triangles. Except at the border, each node has six neighbors.')
    return g
  }

  function generateBridgedCliques(min_order, cliques_count, bridges_count) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var nodes_per_clique = Math.ceil( min_order / cliques_count )
    var c, i, j
    for (c=0 ; c<cliques_count ; c++) {
      for (i=0 ; i<nodes_per_clique ; i++) {
        g.addNode('c'+c+'n'+i, {
          clique: c,
          type: (i < bridges_count) ? ('clique-'+c+'-bridge-'+i) : ('clique-'+c)
        })
        for (j=0; j<i; j++) {
          g.addEdge('c'+c+'n'+i, 'c'+c+'n'+j)
        }
      }
    }
    for (i=0 ; i<bridges_count; i++) {
      for (c=0 ; c<cliques_count ; c++) {
        for (j=0; j<c; j++) {
          g.addEdge('c'+c+'n'+i, 'c'+j+'n'+i)
        }
      }
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Bridged Cliques '+g.order+'n '+cliques_count+'c '+bridges_count+'b')
    g.setAttribute('description', cliques_count+' cliques linked by '+bridges_count+' bridge'+((bridges_count>1)?('s'):(''))+' between each pair')
    return g
  }

  function generateBridgedStars(min_order, stars_count) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var nodes_per_star = Math.ceil( min_order / stars_count )
    var s, i, j
    for (s=0 ; s<stars_count ; s++) {
      g.addNode('s'+s+'n0', {
        star: s,
        type: 'star-'+s+'-center'
      })
      for (i=1 ; i<nodes_per_star ; i++) {
        g.addNode('s'+s+'n'+i, {
          star: s,
          type: 'star-'+s+'-leave'
        })
        g.addEdge('s'+s+'n'+i, 's'+s+'n0')
      }
    }
    for (s=0 ; s<stars_count ; s++) {
      for (j=0; j<s; j++) {
        g.addEdge('s'+s+'n0', 's'+j+'n0')
      }
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Bridged Stars '+g.order+'n '+stars_count+'s')
    g.setAttribute('description', stars_count+' stars linked by bridges between their cores')
    return g
  }

  function generateBridgedLattices(min_order, lattice_count) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var l, i, j
    for (l=0 ; l<lattice_count ; l++) {
      g.addNode('l'+l+'r0c0', {
        type: 'lattice-'+l+'-bridge',
        lattice: l,
        row: 0,
        col: 0
      })
    }
    var rank = 1
    while (g.order < min_order) {
      for (i=0; i<=rank; i++) {
        for (l=0 ; l<lattice_count ; l++) {
          g.addNode('l'+l+'r'+rank+'c'+i, {
            type: 'lattice-'+l,
            lattice: l,
            row: rank,
            col: i
          })
          if (i>0) {
            g.addEdge('l'+l+'r'+rank+'c'+i, 'l'+l+'r'+rank+'c'+(i-1))
            g.addEdge('l'+l+'r'+rank+'c'+i, 'l'+l+'r'+(rank-1)+'c'+(i-1))
          }
          if (i<rank) {
            g.addEdge('l'+l+'r'+rank+'c'+i, 'l'+l+'r'+(rank-1)+'c'+i)
          }
        }
      }
      rank++
    }

    for (l=0 ; l<lattice_count ; l++) {
      for (j=0; j<l; j++) {
        g.addEdge('l'+l+'r0c0', 'l'+j+'r0c0')
      }
    }

    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Bridged Lattices '+g.order+'n '+lattice_count+'l')
    g.setAttribute('description', lattice_count+' triangular lattices linked by bridges at one of their corners')
    return g
  }

  function random(order, p) {
    var b, c, i, j
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    for (i=0; i<order; i++) {
      g.addNode('n'+i, {
        // No attribute
      })
    }
    for (i=0; i<order; i++) {
      for (j=0; j<i; j++) {
        if (Math.random() < p) {
          g.addEdge('n'+i, 'n'+j)
        }
      }
    }
    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'Random P='+(Math.round(1000000*p)/1000000)+' '+g.order+'n')
    g.setAttribute('description', 'Nodes connected with a probability of '+(Math.round(1000000*p)/1000000))
    return g
  }

  function generateSBM(min_order, block_count, p_in, p_out) {
    var b, c, i, j
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var nodes_per_block = Math.ceil(min_order / block_count)
    for (b=0; b<block_count; b++) {
      for (i=0; i<nodes_per_block; i++) {
        g.addNode('b'+b+'n'+i, {
          type: 'block-'+b,
          block: b
        })
      }
    }
    for (b=0; b<block_count; b++) {
      // IN
      for (i=0; i<nodes_per_block; i++) {
        for (j=0; j<i; j++) {
          if (Math.random() < p_in) {
            g.addEdge('b'+b+'n'+i, 'b'+b+'n'+j)
          }
        }
      }
      for (c=0; c<b; c++) {
        // OUT
        for (i=0; i<nodes_per_block; i++) {
          for (j=0; j<nodes_per_block; j++) {
            if (Math.random() < p_out) {
              g.addEdge('b'+b+'n'+i, 'b'+c+'n'+j)
            }
          }
        }
      }
      
    }

    g.setAttribute('creator', 'Generator of test networks')
    g.setAttribute('name', 'SBM '+block_count+' Blocks Pin='+(Math.round(1000000*p_in)/1000000)+' Pout='+(Math.round(1000000*p_out)/1000000)+' '+g.order+'n')
    g.setAttribute('description', block_count+' blocks with random links with controled probability. Probability of link inside a block: '+(Math.round(1000000*p_in)/1000000)+'. Probability of link from block to block: '+(Math.round(1000000*p_out)/1000000)+'. See stochastic block model (SBM).')
    return g
  }

  function generateRecursiveClusters(min_order, cluster_count) {
    var g = new Graph({multi: false, type:'undirected', allowSelfLoops: false})
    var c, d, i, j, g_temp, pairs

    if (min_order <= cluster_count) {
      for (c=0; c<cluster_count; c++) {
        g.addNode('n'+c)
      }
      for (i=0; i<g.order; i++) {
        for (j=0; j<i; j++) {
          g.addEdge('n'+i, 'n'+j)
        }
      }
      return g
    } else {
      for (c=0; c<cluster_count; c++) {
        g_temp = generateRecursiveClusters(Math.ceil(min_order/cluster_count), cluster_count)

        // Add g_temp to g
        g_temp.nodes().forEach(function(nid){
          g.addNode(nid+'-'+c)
        })
        g_temp.edges().forEach(function(eid){
          g.addEdge(g_temp.source(eid)+'-'+c, g_temp.target(eid)+'-'+c)
        })        
      }
      var nodeIds = g_temp.nodes()
      var currentDensity = g_temp.size/(g_temp.order * (g_temp.order - 1))
      for (c=0; c<cluster_count; c++) {
        for (d=0; d<c; d++) {
          pairs = []
          nodeIds.forEach(function(ni){
            nodeIds.forEach(function(nj){
              pairs.push([ni+'-'+c, nj+'-'+d])
            })
          })
          shuffle(pairs)
          var d_out = 0.1 * currentDensity
          var inter_edges_count = d_out*pairs.length
          g.addEdge(pairs[0][0], pairs[0][1])
          for (i=1; i<inter_edges_count; i++) {
            g.addEdge(pairs[i][0], pairs[i][1])
          }
        }
      }
      g.setAttribute('creator', 'Generator of test networks')
      g.setAttribute('name', 'Recursive Groups of '+cluster_count+' Clusters '+g.order+'n')
      g.setAttribute('description', 'Recursive Groups of '+cluster_count+' Clusters with a decreasing link density from each cluster to each other cluster')
      return g
    }
    
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }
  }



})
