var app = angular.module("App", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home.html",
      controller: "AppController",
    })
    .when("/news", {
      templateUrl: "news.html",
      controller: "AppController",
    })
    .when("/login", {
      templateUrl: "login.html",
      controller: "AppController",
      // Add login controller if needed
    })
    .when("/register", {
      templateUrl: "register.html",
      controller: "AppController",
      // Add register controller if needed
    })
    .when("/players", {
      templateUrl: "players.html",
      controller: "AppController",
      // Add players controller if needed
    })
    .when("/wickets", {
      templateUrl: "wickets.html",
      controller: "AppController",
      // Add wickets controller if needed
    })
    .when("/score", {
      templateUrl: "score.html",
      controller: "AppController",
      // Add score controller if needed
    })
    .when("/teamscore", {
      templateUrl: "teamscore.html",
      controller: "AppController",
      // Add teamscore controller if needed
    })
    .when("/winner", {
      templateUrl: "winner.html",
      controller: "AppController",
      // Add teamscore controller if needed
    })
    .when("/h2h", {
      templateUrl: "H2H.html",
      controller: "AppController",
      // Add teamscore controller if needed
    })
    .otherwise({
      redirectTo: "/",
    });
});

app.controller("AppController", function ($scope, $http, $location) {
  $scope.token = "";
  //login
  $scope.name = "";
  $scope.pwd = "";

  //register
  $scope.userData = {};
  $scope.regName = "";
  $scope.regPwd = "";

  //players Input Date
  $scope.playerName = "";
  $scope.playerScore = "";
  $scope.playerPrevScore = "";
  $scope.newScore = "";
  $scope.playerData = "";

  //Wickets Input Date
  $scope.Name = "";
  $scope.Wickets = "";
  $scope.PrevWKT = "";
  $scope.newWKTs = "";
  $scope.WKTData = "";

  //Score
  $scope.scoreName=''
  $scope.score=''

  //teamscore
  $scope.teamName=''
  $scope.teamscore=''

  //Winners
  $scope.winnername='';
  $scope.season='';

  //H2H
  $scope.Teams=''
  $scope.Team1wins=""
  $scope.Team2wins=''


  // Track player being edited
  $scope.editingPlayer = {};
  $scope.editingWicket = {};
  $scope.editingTeams = {};
  $scope.editingTeam2 = {};
  




  //Searching
  $scope.searchPlayer = "";
  $scope.searchWicket = "";
  $scope.searchscore="";
  $scope.searchteamscore="";
  $scope.searchwinner='';
  $scope.searchh2h='';


  //htmlbinding
  $scope.topscorer=""
  $scope.topscorerruns=""

  function logout(){
    localStorage.removeItem('token')
  }
  
  $scope.menuVisible = true;
  $scope.toggleMenu = function(x) {
    //alert('clicked')
    $scope.menuVisible = !$scope.menuVisible;
    
    if(localStorage.getItem('token')){
      if(x==3){
      $scope.getplayers();
      }
      if(x==4){
        $scope.getwickets();
      }
      if(x==5){
        $scope.getscore();
      }
      if(x==6){
        $scope.getteamscore();
      }
      if(x==7){
        $scope.gethwinner();
      }
      if(x==8){
        $scope.geth2h();
      }
      
      
    }
    //alert($scope.menuVisible)

  };


  

  function showSnackbar(message, type) {
    var snackbar = document.getElementById("snackbar");
    var snackbarMessage = document.getElementById("snackbar-message");
    var progressBar = document.querySelector(".progress-bar");

    // Set the dynamic message
    snackbarMessage.textContent = message;

    // Apply the type class
    snackbar.className = "snackbar show " + type;

    // Reset the progress bar animation
    var newProgressBar = document.querySelector(".progress-bar");
    newProgressBar.style.animation = "none";
    newProgressBar.offsetHeight; // Trigger a reflow
    newProgressBar.style.animation = null;

    // After 3 seconds, hide the snackbar
    setTimeout(function () {
      snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
  }

  



  

  $scope.login = function () {
    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_demo_user?sysparm_query=u_name%3D" +
        $scope.name +
        "%5Eu_password%3D" +
        $scope.pwd +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.data = response.data.result;
        //console.log($scope.data);
        if ($scope.data.length) {
          $scope.token = $scope.data[0].sys_id;
          localStorage.setItem("token", $scope.token);
          showSnackbar("User LoggedIn!", "success");
          $scope.getplayers();
          $location.path("/players");
        } else {
          showSnackbar("User Name or Password Invalid!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };

  // Function to create a new incident
  $scope.register = function () {
    $scope.userData = {
      u_name: $scope.regName,
      u_password: $scope.regPwd,
    };

    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_demo_user?sysparm_query=u_name%3D" +
        $scope.regName +
        "%5Eu_password%3D" +
        $scope.regPwd +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.data = response.data.result;
        //console.log($scope.data.length)
        //alert($scope.data)
        if ($scope.data.length) {
          //alert(12345)
          showSnackbar("User already exists", "success");
        } else {
          $http({
            method: "POST",
            url: "https://dev254636.service-now.com/api/now/table/u_demo_user",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
            data: $scope.userData,
          }).then(
            function (response) {
              // Handle success - Maybe refresh the incident list or show a success message
              showSnackbar("User Registered!", "success");
              localStorage.setItem("token", response.data.result.sys_id);
              $location.path("/players");
            },
            function (error) {
              //console.error('Error creating incident: ', error);
            }
          );
        }
      },
      function (error) {}
    );
  };

  $scope.addplayer = function () {
    $scope.player_id = "";
    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_player?sysparm_query=u_user%3D" +
        localStorage.getItem("token") +
        "%5Eu_name%3D" +
        $scope.playerName +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.data = response.data.result;
        //console.log($scope.data);
        if ($scope.data.length) {
          //$location.path('/players')
          $scope.player_id = $scope.data[0].sys_id;
          // console.log($scope.data[0]);
          // console.log($scope.player_id);
          $scope.playerPrevScore = $scope.data[0].u_score;
          $scope.playerData = {
            u_score:
              parseInt($scope.playerScore) +parseInt($scope.playerPrevScore),
          };

          //PUT
          $http({
            method: "PUT",
            url:
              "https://dev254636.service-now.com/api/now/table/u_player/" +
              $scope.player_id,
            headers: {
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
              "Content-Type": "application/json",
            },
            data: $scope.playerData,
          }).then(
            function (response) {
              // Refresh the list
              showSnackbar('Updated Successfully!')
              $scope.getplayers();
            },
            function (error) {
              console.error("Error updating record:", error);
            }
          );
        } else {
          $scope.playerData = {
            u_user: localStorage.getItem("token"),
            u_name: $scope.playerName,
            u_score: $scope.playerScore,
          };
          $http({
            method: "POST",
            url: "https://dev254636.service-now.com/api/now/table/u_player",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
            data: $scope.playerData,
          }).then(
            function (response) {
              // Handle success - Maybe refresh the incident list or show a success message
              showSnackbar("Player Added!", "success");
              $scope.getplayers()
            },
            function (error) {
              //console.error('Error creating incident: ', error);
            }
          );
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };
  $scope.getnews=function(){
    if(localStorage.getItem('token')){
    $location.path("/news")
    }
    else{
      showSnackbar('You need to login first!')
    }
  }

  $scope.getplayers = function () {
    $http({
      method: "GET",
      url: "https://dev254636.service-now.com/api/now/table/u_player",
      params: {
        sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYDESCu_score",
        sysparm_limit: 1000
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.getdata = response.data.result;
        if ($scope.getdata.length) {
          //console.log($scope.getdata);
          //console.log($scope.getdata[0]);
          $scope.top=$scope.getdata[0]
        } else {
          showSnackbar("No Data Available for this User!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };
  
  $scope.updatePlayer = function (name, score) {
    $scope.player_id = "";
    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_player?sysparm_query=u_user%3D" +
        localStorage.getItem("token") +
        "%5Eu_name%3D" +
        name +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(function (response) {
      $scope.data = response.data.result;
      //console.log($scope.data);

      //$location.path('/players')
      $scope.player_id = $scope.data[0].sys_id;
      // console.log($scope.data[0]);
      // console.log($scope.player_id);
      $scope.playerPrevScore = $scope.data[0].u_score;
      $scope.playerData = {
        u_score: parseInt(score) + parseInt($scope.playerPrevScore),
      };

      //PUT
      $http({
        method: "PUT",
        url:
          "https://dev254636.service-now.com/api/now/table/u_player/" +
          $scope.player_id,
        headers: {
          Authorization: "Basic " + btoa("REST:Hardik3393@"),
          "Content-Type": "application/json",
        },
        data: $scope.playerData,
      }).then(
        function (response) {
          // Refresh the list
          showSnackbar("Data updated successfully!",'success')
          $scope.editingPlayer = {};
          $scope.getplayers();
        },
        function (error) {
          console.error("Error updating record:", error);
        }
      );
    });
  };


  //add Wickets
  $scope.addwickets = function () {
    // $scope.Name = "";
    // $scope.Wickets = "";
    // $scope.PrevWKT = "";
    // $scope.newWKTs = "";
    // $scope.WKTData = "";

    $scope.wickets_id = "";
    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_wickets?sysparm_query=u_user%3D" +
        localStorage.getItem("token") +
        "%5Eu_name%3D" +
        $scope.Name +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.data = response.data.result;
        //console.log($scope.data);
        if ($scope.data.length) {
          //$location.path('/players')
          $scope.wickets_id = $scope.data[0].sys_id;
      //console.log($scope.data[0]);
      // console.log($scope.player_id);
      $scope.playerPrevScore = $scope.data[0].u_wkts;
      $scope.WKTData = {
        u_wkts: parseInt($scope.Wickets)+ parseInt($scope.playerPrevScore),
      };

          //PUT
          $http({
            method: "PUT",
            url:
              "https://dev254636.service-now.com/api/now/table/u_wickets/" +
              $scope.wickets_id,
            headers: {
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
              "Content-Type": "application/json",
            },
            data: $scope.WKTData,
          }).then(
            function (response) {
              // Refresh the list
              showSnackbar('Updated Successfully!')
              $scope.getwickets();
            },
            function (error) {
              console.error("Error updating record:", error);
            }
          );
        } else {
          $scope.WKTData = {
            u_user: localStorage.getItem("token"),
            u_name: $scope.Name,
            u_wkts: $scope.Wickets,
          };
          $http({
            method: "POST",
            url: "https://dev254636.service-now.com/api/now/table/u_wickets",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
            data: $scope.WKTData,
          }).then(
            function (response) {
              // Handle success - Maybe refresh the incident list or show a success message
              showSnackbar("Wickets Added!", "success");
              $scope.getwickets()
            },
            function (error) {
              //console.error('Error creating incident: ', error);
            }
          );
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };


  $scope.getwickets = function () {
    $http({
      method: "GET",
      url: "https://dev254636.service-now.com/api/now/table/u_wickets",
      params: {
        sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYDESCu_wkts",
        sysparm_limit: 1000
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.getwktsdata = response.data.result;
        if ($scope.getwktsdata.length) {
          //console.log($scope.getwktsdata[0]);
          $scope.topwickettaker=$scope.getwktsdata[0]
        } else {
          showSnackbar("No Data Available for this User!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };


  $scope.updateWickets = function (name, score) {
    $scope.wickets_id = "";
    $http({
      method: "GET",
      url:
        "https://dev254636.service-now.com/api/now/table/u_wickets?sysparm_query=u_user%3D" +
        localStorage.getItem("token") +
        "%5Eu_name%3D" +
        name +
        "&sysparm_limit=1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(function (response) {
      $scope.data = response.data.result;
      //console.log($scope.data);

      //$location.path('/players')
      $scope.wickets_id = $scope.data[0].sys_id;
      //console.log($scope.data[0]);
      // console.log($scope.player_id);
      $scope.playerPrevScore = $scope.data[0].u_wkts;
      $scope.WKTData = {
        u_wkts: parseInt(score) + parseInt($scope.playerPrevScore),
      };

      //PUT
      $http({
        method: "PUT",
        url:
          "https://dev254636.service-now.com/api/now/table/u_wickets/" +
          $scope.wickets_id,
        headers: {
          Authorization: "Basic " + btoa("REST:Hardik3393@"),
          "Content-Type": "application/json",
        },
        data: $scope.WKTData,
      }).then(
        function (response) {
          // Refresh the list
          showSnackbar("Data updated successfully!",'success')
          $scope.editingPlayer = {};
          $scope.getwickets();
        },
        function (error) {
          console.error("Error updating record:", error);
        }
      );
    });
  };


  $scope.addscore=function(){
    $scope.playerData = {
      u_user: localStorage.getItem("token"),
      u_name: $scope.scoreName,
      u_hscore: $scope.score,
    };
    $http({
      method: "POST",
      url: "https://dev254636.service-now.com/api/now/table/u_highestindivudual",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
      data: $scope.playerData,
    }).then(
      function (response) {
        // Handle success - Maybe refresh the incident list or show a success message
        showSnackbar("Player Highest Score Added!", "success");
        //$scope.getplayers()
        $scope.getscore();
      },
      function (error) {
        //console.error('Error creating incident: ', error);
      }
    );
  }

  $scope.getscore = function () {
    $http({
      method: "GET",
      url: "https://dev254636.service-now.com/api/now/table/u_highestindivudual",
      params: {
        sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYDESCu_hscore",
        sysparm_limit: 1000
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.getscoredata = response.data.result;
        if ($scope.getscoredata.length) {
          //console.log($scope.getscoredata);
          $scope.topindiscore=$scope.getscoredata[0]
        } else {
          showSnackbar("No Data Available for this User!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };


  $scope.addteamscore=function(){
    $scope.playerData = {
      u_user: localStorage.getItem("token"),
      u_team: $scope.teamName,
      u_htscore: $scope.teamscore,
    };
    $http({
      method: "POST",
      url: "https://dev254636.service-now.com/api/now/table/u_highestteamscore",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
      data: $scope.playerData,
    }).then(
      function (response) {
        // Handle success - Maybe refresh the incident list or show a success message
        showSnackbar("Team Highest Score Added!", "success");
        $scope.getteamscore()
      },
      function (error) {
        //console.error('Error creating incident: ', error);
      }
    );
  }

  $scope.getteamscore = function () {
    $http({
      method: "GET",
      url: "https://dev254636.service-now.com/api/now/table/u_highestteamscore",
      params: {
        sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYDESCu_htscore",
        sysparm_limit: 1000
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.getteamscoredata = response.data.result;
        if ($scope.getteamscoredata.length) {
          //console.log($scope.getwktsdata);
          $scope.topteam_score=$scope.getteamscoredata[0]
        } else {
          showSnackbar("No Data Available for this User!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };

  //https://dev254636.service-now.com/api/now/table/u_winner
  $scope.addwinner=function(){
  //   $scope.winnername='';
  // $scope.season='';
    $scope.playerData = {
      u_user: localStorage.getItem("token"),
      u_team: $scope.winnername,
      u_season2: $scope.season,
    };
    $http({
      method: "POST",
      url: "https://dev254636.service-now.com/api/now/table/u_winner",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
      data: $scope.playerData,
    }).then(
      function (response) {
        // Handle success - Maybe refresh the incident list or show a success message
        showSnackbar("Winner Added successfully!", "success");
        $scope.getwinner()
      },
      function (error) {
        //console.error('Error creating incident: ', error);
      }
    );
  }

  $scope.getwinner = function () {
    $http({
      method: "GET",
      url: "https://dev254636.service-now.com/api/now/table/u_winner",
      params: {
        sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYu_season2",
        sysparm_limit: 1000
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("REST:Hardik3393@"),
      },
    }).then(
      function (response) {
        $scope.getwinnerData = response.data.result;
        if ($scope.getwinnerData.length) {
          //console.log($scope.getwktsdata);
        } else {
          showSnackbar("No Data Available for this User!", "error");
        }
      },
      function (error) {
        showSnackbar("User Name or Password Invalid!", "error");
      }
    );
  };

  $scope.addh2h= function () {
    $scope.h2h_id = "";
    //{"u_user":"","u_teams":"","u_team1wins":"","u_team2wins":""}
  //   $scope.Teams=''
  // $scope.Team1wins=""
  // $scope.Team2wins=''
          $scope.playerData = {
            u_user: localStorage.getItem("token"),
            u_teams: $scope.Teams,
            u_team1wins: $scope.Team1wins,
            u_team2wins:$scope.Team2wins
          };
          $http({
            method: "POST",
            url: "https://dev254636.service-now.com/api/now/table/u_h2h",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
            data: $scope.playerData,
          }).then(
            function (response) {
              // Handle success - Maybe refresh the incident list or show a success message
              showSnackbar("Team Stats Added!", "success");
              $scope.geth2h()
            },
            function (error) {
              //console.error('Error creating incident: ', error);
            }
          );
        }

        $scope.geth2h = function () {
          $http({
            method: "GET",
            url: "https://dev254636.service-now.com/api/now/table/u_h2h",
            params: {
              sysparm_query: "u_user=" + localStorage.getItem("token"),
              sysparm_limit: 1000
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
          }).then(
            function (response) {
              $scope.getdata = response.data.result;
              if ($scope.getdata.length) {
                //console.log($scope.getdata);
              } else {
                showSnackbar("No Data Available for this User!", "error");
              }
            },
            function (error) {
              showSnackbar("User Name or Password Invalid!", "error");
            }
          );
        };
      
        $scope.updateh2h = function (teams,wins1, wins2) {
          $scope.team_id = "";
          $http({
            method: "GET",
            url:
              "https://dev254636.service-now.com/api/now/table/u_h2h?sysparm_query=u_user%3D" +
              localStorage.getItem("token") +
              "%5Eu_teams%3D" +
              teams +
              "&sysparm_limit=1",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
          }).then(function (response) {
            $scope.data = response.data.result;
            //console.log($scope.data);
      
            //$location.path('/players')
            $scope.team_id = $scope.data[0].sys_id;
            //console.log($scope.data[0]);
            // console.log($scope.player_id);
            $scope.playerPrevScore1 = $scope.data[0].u_team1wins;
            $scope.playerPrevScore2 = $scope.data[0].u_team2wins;
            //alert(teams+"-"+wins1+"-"+wins2)
            $scope.playerData = {
              u_teams:teams,
              u_team1wins: parseInt(wins1) + parseInt($scope.playerPrevScore1),
              u_team2wins: parseInt(wins2) + parseInt($scope.playerPrevScore2)
            };
      
            //PUT
            $http({
              method: "PUT",
              url:
                "https://dev254636.service-now.com/api/now/table/u_h2h/" +
                $scope.team_id,
              headers: {
                Authorization: "Basic " + btoa("REST:Hardik3393@"),
                "Content-Type": "application/json",
              },
              data: $scope.playerData,
            }).then(
              function (response) {
                // Refresh the list
                showSnackbar("Data updated successfully!",'success')
                $scope.editingTeams={};
                $scope.geth2h();
              },
              function (error) {
                console.error("Error updating record:", error);
              }
            );
          });
        };



        $scope.gethwinner = function () {
          $http({
            method: "GET",
            url: "https://dev254636.service-now.com/api/now/table/u_winner",
            params: {
              sysparm_query: "u_user=" + localStorage.getItem("token") + "^ORDERBYu_season2",
              sysparm_limit: 1000
            },
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("REST:Hardik3393@"),
            },
          }).then(
            function (response) {
              $scope.getwinnerData = response.data.result;
              if ($scope.getwinnerData.length) {
                // Count wins for each team
                const teamWins = {};
                $scope.getwinnerData.forEach(winner => {
                  const team = winner.u_team; // assuming u_team_name is the field for the team name
                  if (teamWins[team]) {
                    teamWins[team]++;
                  } else {
                    teamWins[team] = 1;
                  }
                });
        
                // Find the team with the highest wins
                
                let maxWins = 0;
                let winningTeam = "";
                for (const team in teamWins) {
                  if (teamWins[team] > maxWins) {
                    maxWins = teamWins[team];
                    winningTeam = team;
                  }
                }
        
                if (winningTeam) {
                  $scope.wins=maxWins;
                  $scope.teamwins=winningTeam;
                  // showSnackbar(`The team with the highest wins is ${winningTeam} with ${maxWins} wins!`, "success");
                } else {
                  showSnackbar("No teams found!", "error");
                }
              } else {
                showSnackbar("No Data Available for this User!", "error");
              }
            },
            function (error) {
              showSnackbar("User Name or Password Invalid!", "error");
            }
          );
        };
        $scope.short=false;
        $scope.getnewsshort=function(){
          $scope.getplayers();
          $scope.getwickets();
          $scope.getscore();
          $scope.getteamscore();
          $scope.gethwinner();
          $scope.short=!$scope.short;
        }



        $scope.getnews2=function(){
          
          $scope.getplayers();
          $scope.getwickets();
          $scope.getscore();
          $scope.getteamscore();
          $scope.gethwinner();
        }
});
