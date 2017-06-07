import angular from "angular";
import 'angular-ui-router';
import 'angular-cookies';
import 'ngMap';

import {routerConfig} from "./routes";

import {HomeController} from "./controllers/home";
import {RegisterController} from "./controllers/register";
import {RespondController} from "./controllers/respond";
import {HelpController} from "./controllers/help";
import {OnRouteController} from "./controllers/onroute"

//Services
import {RequestsService} from "./services/requests";


angular.module('app', ['ui.router', 'ngMap'])
	.config(routerConfig)

	.controller('HomeController', HomeController)
    .controller('RegisterController', RegisterController)
    .controller('HelpController', HelpController)
    .controller('RepondController', RespondController)
    .controller('OnRouteController', OnRouteController)

	.service('RequestsService', RequestsService)
