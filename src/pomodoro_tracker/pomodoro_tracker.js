var app = angular.module('PomodoroApp', []);
app.controller('MainCtrl', function($scope, $interval) {
  $scope.breakLength = 5;
  $scope.sessionLength = 25;
  $scope.timeLeft = $scope.sessionLength;
  $scope.fillHeight = '0%';
  $scope.currentPomodoro = 1;
  $scope.showSkipButton = false;
  $scope.sessionType = 'pomodoro'

  var running = false;
  var secs = 60 * $scope.timeLeft;

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }

  $scope.changeTime = function(time, type) {
      if (!running) {
          if(type === 'break') {
              $scope.breakLength += time;
              if ($scope.breakLength < 1) $scope.breakLength = 1;
          }
          else {
              $scope.sessionLength += time;
              if ($scope.sessionLength < 1) $scope.sessionLength = 1;

              $scope.timeLeft = $scope.sessionLength;
              secs = 60 * $scope.sessionLength;
          }
      }
  }

  $scope.toggleTimer = function() {
    if (!running) {
      $scope.currentLength = $scope.sessionLength;
      updateTimer();
      running = $interval(updateTimer, 1000);
    } else {
      $interval.cancel(running);
      running = false;
    }
  }

  $scope.cancelBreak = function() {
      secs = 0;
  }

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      // Play audio
      var wav = 'https://notificationsounds.com/soundfiles/6ea2ef7311b482724a9b7b0bc0dd85c6/file-sounds-935-attention-seeker.wav';
      var audio = new Audio(wav);
	  audio.play();
      $scope.fillHeight = 0 + '%';

      // toggle break and pomodoro session
      if ($scope.sessionType === 'break') {
        $scope.currentPomodoro += 1;
        $scope.fillColor = '#50db3b'
        $scope.sessionType = 'pomodoro'
        $scope.showSkipButton = false;
        updateTimes($scope.sessionLength);

      }
      else {
        $scope.fillColor = '#FF4444';
        $scope.sessionType = 'break'
        $scope.showSkipButton = true;
        updateTimes($scope.breakLength);
      }
    }
    else {
      $scope.timeLeft = secondsToHms(secs);
      var denom = 60 * $scope.currentLength;
      var perc = Math.abs((secs / denom) * 100 - 100);
      $scope.fillHeight = perc + '%';
    }
  }

  function updateTimes(session) {
      $scope.currentLength = session;
      $scope.timeLeft = 60 * session;
      secs = 60 * session;
  }
});

export default app;
