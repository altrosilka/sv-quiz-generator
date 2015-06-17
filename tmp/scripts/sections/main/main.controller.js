(function() {
  'use strict';

  angular
    .module('app.sections')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($scope, $timeout, $modal) {

    var ctrl = this;

    ctrl.backgrounds = [{
      src: 'img/1.jpg'
    }, {
      src: 'img/2.jpg'
    }, {
      src: 'img/3.jpg'
    }, {
      src: 'img/4.jpg'
    }, {
      src: 'img/5.jpg'
    }, {
      src: 'img/6.jpg'
    }];

    ctrl.options = {
      mod: 0,
      defaultMargin: 30,
      background: {
        size: 'cover',
        position: 'center'
      },
      size: {
        width: 600,
        height: 400
      },
      font: {
        family: "balance_cyrbold",
        weight: 'normal',
        color: '#fff'
      },
      texts: []
    };


    ctrl.selectBackground = function(background) {
      ctrl.options.background.src = background.src;
    }

    $scope.$watch(function() {
      return ctrl.newBackground;
    }, function(src) {
      if (!src) return;
      ctrl.backgrounds.unshift({
        src: 'data:image/png;base64,' + src
      });
      ctrl.selectBackground(ctrl.backgrounds[0]);
    });

    /* MASK */
    ctrl.removeMask = function() {
      ctrl.options.mask = undefined;
    }

    $scope.$watch(function() {
      return ctrl.newMask;
    }, function(src) {
      if (!src) return;
      ctrl.options.mask = {
        src: 'data:image/png;base64,' + src
      };
    });

    /* LOGO */
    ctrl.removeLogo = function() {
      ctrl.options.logo = undefined;
    }

    $scope.$watch(function() {
      return ctrl.newLogo;
    }, function(src) {
      if (!src) return;
      var image = new Image();
      image.src = 'data:image/png;base64,' + src;
      image.onload = function() {

        $scope.$apply(function() {
          ctrl.options.logo = {
            src: image.src,
            width: image.width,
            height: image.height,
            x: ctrl.options.defaultMargin,
            y: ctrl.options.size.height - image.height - ctrl.options.defaultMargin
          };
        });
      }
    });




    ctrl.openTemplateModal = function() {
      $modal.open({
        templateUrl: 'sections/templates-modal/templates-modal.html',
        controller: 'TemplatesModalCtrl as ctrl',
        size: 'md',
        windowClass: 'templatesModal',
        resolve: {
          options: function() {
            return ctrl.options;
          }
        }
      }).result.then(function(template) {
        angular.extend(ctrl.options, template);
      }, function() {
 
      });
    }

    ctrl.createImage = function() {
      html2canvas(document.getElementById('image'), {
        useCORS: true,
        onrendered: function(canvas) {
          $timeout(function() {
            canvas.toBlob(function(blob) {
              saveAs(blob, "social_" + Math.random().toString(36).substring(13) + ".png");
            });
          }, 500);
        }
      });
    }
  }
})();
