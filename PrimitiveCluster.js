function getScreenSpacePositions(
    collection,
    points,
    scene,
    occluder,
    entityCluster
  ) {
    if (!defined(collection)) {
      return;
    }
   
    var length = collection.length;
    for (var i = 0; i < length; ++i) {
      var item = collection.get(i);
      item.clusterShow = false;
   
      if (
        !item.show ||
        (entityCluster._scene.mode === SceneMode.SCENE3D &&
          !occluder.isPointVisible(item.position))
      ) {
        continue;
      }
   
      //将该段直接注释
      /*var canClusterLabels =
        entityCluster._clusterLabels && defined(item._labelCollection);
      var canClusterBillboards =
        entityCluster._clusterBillboards && defined(item.id._billboard);
      var canClusterPoints =
        entityCluster._clusterPoints && defined(item.id._point);
      if (canClusterLabels && (canClusterPoints || canClusterBillboards)) {
        continue;
      }*/
   
      var coord = item.computeScreenSpacePosition(scene);
      if (!defined(coord)) {
        continue;
      }
   
      points.push({
        index: i,
        collection: collection,
        clustered: false,
        coord: coord,
      });
    }
  }