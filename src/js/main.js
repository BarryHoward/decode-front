import angular from "angular";
import 'angular-ui-router';
import 'angular-cookies';

import {routerConfig} from "./routes";

import {HomeController} from "./controllers/home";
import {RegisterController} from "./controllers/register";
import {RespondController} from "./controllers/respond";
import {HelpController} from "./controllers/help";

//Services
import {RequestsService} from "./services/requests";


angular.module('app', ['ui.router'])
	.config(routerConfig)

	.controller('HomeController', HomeController)
    .controller('RegisterController', RegisterController)
    .controller('HelpController', HelpController)
    .controller('RepondController', RespondController)

	.service('RequestsService', RequestsService)
