'use strict';

angular.module('myApp', [])
    .controller('Inicio', Inicio);

function Inicio($scope) {
    $scope.linguagem = "aabb";
    $scope.invalida = false;
    $scope.estado_atual = "q0";
    $scope.estado_tran = [];
    $scope.temp_palavas = [];

    $scope.verifica_automato = function () {
        $scope.invalida = false;
        $scope.estado_atual = "q0";
        $scope.estado_tran = [];
        $scope.array_linguagem = Array.from($scope.linguagem);
        angular.forEach($scope.array_linguagem, function (value, key) {
            $scope.verifica_estado($scope.estado_atual, value, key);
        });
        $scope.estado_tran.push({ant: "qf", atu: "qf", simb: "ϵ", trans: "ϵ"});
    };

    $scope.verifica_estado = function (estado, simbolo, key) {
        var mudanca;

        if ($scope.estado_atual === 'q0') {
            mudanca = $scope.linguagem;
        } else {
            mudanca = $scope.linguagem.slice(key);
        }

        if ($scope.estado_atual === 'q0') {
            if (simbolo === 'a') {
                $scope.estado_atual = "q1";
                $scope.estado_tran.push({ant: "q0", atu: "q1", simb: simbolo, trans: mudanca});
                return;
            } else if (simbolo === 'b') {
                $scope.estado_atual = "q2";
                $scope.estado_tran.push({ant: "q0", atu: "q2", simb: simbolo, trans: mudanca});
                return;
            } else {
                $scope.invalida = true;
                return;
            }
        }

        if ($scope.estado_atual === 'q1') {
            if (simbolo === 'a') {
                $scope.estado_atual = "qf";
                $scope.estado_tran.push({ant: "q1", atu: "qf", simb: simbolo, trans: mudanca});
                return;
            } else if (simbolo === 'b') {
                $scope.estado_atual = "q2";
                $scope.estado_tran.push({ant: "q1", atu: "q2", simb: simbolo, trans: mudanca});
                return;
            } else {
                $scope.invalida = true;
                return;
            }
        }

        if ($scope.estado_atual === 'q2') {
            if (simbolo === 'a') {
                $scope.estado_atual = "q1";
                $scope.estado_tran.push({ant: "q2", atu: "q1", simb: simbolo, trans: mudanca});
                return;
            } else if (simbolo === 'b') {
                $scope.estado_atual = "qf";
                $scope.estado_tran.push({ant: "q2", atu: "qf", simb: simbolo, trans: mudanca});
                return;
            } else {
                $scope.invalida = true;
                return;
            }
        }

        if ($scope.estado_atual === 'qf') {
            if (simbolo === 'a' || simbolo === 'b') {
                $scope.estado_atual = "qf";
                $scope.estado_tran.push({ant: "qf", atu: "qf", simb: simbolo, trans: mudanca});
                return;
            }
        }
    };
}
