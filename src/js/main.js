import angular from "angular";
import 'angular-ui-router';
import 'angular-cookies';
import 'ngMap'
import 'ngCookies'

import {routerConfig} from "./routes";

import {RootController} from "./controllers/root";
import {HomeController} from "./controllers/home";
import {RegisterControlloer} from "./controllers/register"

//Services
import {RequestsService} from "./services/requests";


angular.module('app', ['ngMap', 'ui.router', 'ngCookies'])
	.config(routerConfig)

	.controller('RootController', RootController)
	.controller('HomeController', HomeController)

	.service('RequestsService', RequestsService)
