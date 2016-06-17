/*
 * boids.js
 * https://github.com/after12am/boids.js
 *
 * Copyright 2012-2016 Satoshi Okami
 * Released under the MIT license
 */
var boids=function(){var c={VERSION:"1.2.6",THREE:{},Vector3:function(a,b,c){this.x=a||0;this.y=b||0;this.z=c||0}};c.Vector3.prototype={constructor:c.Vector3,set:function(a,b,c){this.x=a;this.y=b;this.z=c;return this},setX:function(a){this.x=a;return this},setY:function(a){this.y=a;return this},setZ:function(a){this.z=a;return this},copy:function(a){this.x=a.x;this.y=a.y;this.z=a.z;return this},clone:function(){return new c.Vector3(this.x,this.y,this.z)},add:function(a,b){this.x=a.x+b.x;this.y=a.y+
b.y;this.z=a.z+b.z;return this},addSelf:function(a){this.x+=a.x;this.y+=a.y;this.z+=a.z;return this},addScalar:function(a){this.x+=a;this.y+=a;this.z+=a;return this},sub:function(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this},subSelf:function(a){this.x-=a.x;this.y-=a.y;this.z-=a.z;return this},multiply:function(a,b){this.x=a.x*b.x;this.y=a.y*b.y;this.z=a.z*b.z;return this},multiplySelf:function(a){this.x*=a.x;this.y*=a.y;this.z*=a.z;return this},multiplyScalar:function(a){this.x*=
a;this.y*=a;this.z*=a;return this},divideSelf:function(a){this.x/=a.x;this.y/=a.y;this.z/=a.z;return this},divideScalar:function(a){a?(this.x/=a,this.y/=a,this.z/=a):this.z=this.y=this.x=0;return this},negate:function(){return this.multiplyScalar(-1)},dot:function(a){return this.x*a.x+this.y*a.y+this.z*a.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.lengthSq())},lengthManhattan:function(){return this.x+this.y+this.z},normalize:function(){return this.divideScalar(this.length())},
setLength:function(a){return this.normalize().multiplyScalar(a)},cross:function(a,b){this.x=a.y*b.z-a.z*b.y;this.y=a.z*b.x-a.x*b.z;this.z=a.x*b.y-a.y*b.x;return this},crossSelf:function(a){var b=this.x,c=this.y,e=this.z;this.x=c*a.z-e*a.y;this.y=e*a.x-b*a.z;this.z=b*a.y-c*a.x;return this},distanceTo:function(a){return Math.sqrt(this.distanceToSquared(a))},distanceToSquared:function(a){return(new c.Vector3).sub(this,a).lengthSq()},setPositionFromMatrix:function(a){this.x=a.n14;this.y=a.n24;this.z=
a.n34},setRotationFromMatrix:function(a){var b=Math.cos(this.y);this.y=Math.asin(a.n13);1E-5<Math.abs(b)?(this.x=Math.atan2(-a.n23/b,a.n33/b),this.z=Math.atan2(-a.n12/b,a.n11/b)):(this.x=0,this.z=Math.atan2(a.n21,a.n22))},isZero:function(){return 1E-4>this.lengthSq()}};c.Vector3.prototype.limitScalar=function(a){var b=this.lengthSq();b>a*a&&0<b&&(a/=Math.sqrt(b),this.x*=a,this.y*=a,this.z*=a);return this};try{THREE.Vector3.prototype.limitScalar=function(a){var b=this.lengthSq();b>a*a&&0<b&&(a/=Math.sqrt(b),
this.x*=a,this.y*=a,this.z*=a);return this}}catch(a){}c.nextVehicleId=function(){var a=0;return function(){return a++}}();c.getRandVec=function(){var a=new c.Vector3,b=360*Math.random()*Math.PI/180,d=2*Math.random()*Math.PI;a.x=Math.sin(b)*Math.cos(d);a.y=Math.sin(b)*Math.sin(d);a.z=Math.cos(b);return a};c.Vehicle=function(a,b,d){this.id=c.nextVehicleId();this.mass=1;this.maxSpeed=4;this.maxTrailSize=10;this.position=new c.Vector3(a,b,d);this.velocity=new c.Vector3;this.trails=[]};c.Vehicle.prototype.update=
function(){this.velocity.limitScalar(this.maxSpeed);this.position.addSelf(this.velocity);this.trails.push(this.position.clone());this.trails.length>=this.maxTrailSize&&this.trails.shift()};c.Vehicle.prototype.bounce=function(a,b,c){this.position.x>.5*a?(this.position.x=.5*a,this.velocity.x*=-1):this.position.x<.5*-a&&(this.position.x=.5*-a,this.velocity.x*=-1);this.position.y>.5*b?(this.position.y=.5*b,this.velocity.y*=-1):this.position.y<.5*-b&&(this.position.y=.5*-b,this.velocity.y*=-1);this.position.z>
.5*c?(this.position.z=.5*c,this.velocity.z*=-1):this.position.z<.5*-c&&(this.position.z=.5*-c,this.velocity.z*=-1)};c.Vehicle.prototype.wrap=function(a,b,c){this.position.x>.5*a?this.position.x=.5*-a:this.position.x<.5*-a&&(this.position.x=.5*a);this.position.y>.5*b?this.position.y=.5*-b:this.position.y<.5*-b&&(this.position.y=.5*b);this.position.z>.5*c?this.position.z=.5*-c:this.position.z<.5*-c&&(this.position.z=.5*c)};c.SteeredVehicle=function(a,b,d){var e=this,f=360*Math.random(),h=360*Math.random();
this.steeringForce=new c.Vector3;this.maxForce=1;this.wanderDistance=10;this.wanderRadius=5;this.wanderRange=10;this.pathIndex=0;this.pathThreshold=20;this.inSightDist=120;this.tooCloseDist=20;this.wander=function(){var a=new c.Vector3;new c.Vector3;a.set(e.velocity);a.normalize();a.multiplyScalar(e.wanderDistance);var b=e.wanderRadius,d=f*Math.PI/180,k=h*Math.PI/180,g=new c.Vector3;g.x=b*Math.sin(d)*Math.cos(k);g.y=b*Math.sin(d)*Math.sin(k);g.z=b*Math.cos(d);f+=Math.random()*e.wanderRange-.5*e.wanderRange;
h+=Math.random()*e.wanderRange-.5*e.wanderRange;e.steeringForce.addSelf(a.addSelf(g))};c.Vehicle.call(this,a,b,d)};c.SteeredVehicle.prototype=new c.Vehicle;c.SteeredVehicle.prototype.addForce=function(a){"object"==typeof a?this.steeringForce.addSelf(a):"number"==typeof a&&this.steeringForce.addScalar(a)};c.SteeredVehicle.prototype.Vehicle_update=c.SteeredVehicle.prototype.update;c.SteeredVehicle.prototype.update=function(){this.steeringForce.limitScalar(this.maxForce);this.steeringForce.multiplyScalar(1/
this.mass);this.velocity.addSelf(this.steeringForce);this.Vehicle_update();this.steeringForce.set(0,0,0)};c.SteeredVehicle.prototype.seek=function(a){var b=new c.Vector3;b.set(a.x,a.y,a.z);b.subSelf(this.position);b.normalize();b.multiplyScalar(this.maxSpeed);this.steeringForce.addSelf(b.subSelf(this.velocity))};c.SteeredVehicle.prototype.flee=function(a){var b=new c.Vector3;b.set(a.x,a.y,a.z);b.subSelf(this.position);b.normalize();b.multiplyScalar(this.maxSpeed);this.steeringForce.subSelf(b.subSelf(this.velocity))};
c.SteeredVehicle.prototype.arrive=function(a){var b=25*this.maxSpeed,d=new c.Vector3;d.set(a.x,a.y,a.z);d.subSelf(this.position);d.normalize();a=this.position.distanceTo(a);a>b?d.multiplyScalar(this.maxSpeed):d.multiplyScalar(this.maxSpeed*a/b);this.steeringForce.addSelf(d.subSelf(this.velocity))};c.SteeredVehicle.prototype.pursue=function(a){var b=this.position.distanceTo(a.position)/this.maxSpeed,d=new c.Vector3;d.set(a.velocity.x,a.velocity.y,a.velocity.z);d.multiplyScalar(b);b=new c.Vector3;b.set(a.position.x,
a.position.y,a.position.z);b.addSelf(d);this.seek(b)};c.SteeredVehicle.prototype.evade=function(a){var b=this.position.distanceTo(a.position)/this.maxSpeed,d=new c.Vector3;d.set(a.velocity.x,a.velocity.y,a.velocity.z);d.multiplyScalar(b);b=new c.Vector3;b.set(a.position.x,a.position.y,a.position.z);b.subSelf(d);this.flee(b)};c.SteeredVehicle.prototype.patrol=function(a,b){b=b||!1;var c=this.pathIndex>=a.length-1;this.position.distanceTo(a[this.pathIndex])<this.pathThreshold&&(c&&b?this.pathIndex=
0:c||this.pathIndex++);c&&!b?this.arrive(a[this.pathIndex]):this.seek(a[this.pathIndex])};c.SteeredVehicle.prototype.flock=function(a){var b=new c.Vector3,d=new c.Vector3,e=0;b.set(this.velocity.x,this.velocity.y,this.velocity.z);for(var f=0;f<a.length;f++)a[f].id!=this.id&&this.inSight(a[f].position)&&(b.addSelf(a[f].velocity),d.addSelf(a[f].position),e++,this.tooClose(a[f].position)&&this.flee(a[f].position));0<e&&(d.multiplyScalar(1/e),this.seek(d),b.multiplyScalar(1/e),this.steeringForce.addSelf(b.subSelf(this.velocity)))};
c.SteeredVehicle.prototype.randomWalk=function(){var a=c.getRandVec();a.normalize();a.multiplyScalar(this.maxSpeed);this.steeringForce.addSelf(a.subSelf(this.velocity))};c.SteeredVehicle.prototype.inSight=function(a){if(this.position.distanceTo(a)>this.inSightDist)return!1;var b=new c.Vector3;b.set(this.velocity.x,this.velocity.y,this.velocity.z);b.normalize();var d=new c.Vector3;d.set(a);d.subSelf(this.position);return 0>d.dot(b)?!1:!0};c.SteeredVehicle.prototype.tooClose=function(a){return this.position.distanceTo(a)<
this.tooCloseDist};c.BiologicalVehicle=function(a,b,d){var e=0;this.remainingLifePer=this.lifeSpan=1;this.aging=function(a){e+=a;this.remainingLifePer=Math.max(0,Math.min(1,(this.lifeSpan-e)/this.lifeSpan))};this.isDead=function(){return e>this.lifeSpan};c.SteeredVehicle.call(this,a,b,d)};c.BiologicalVehicle.prototype=new c.SteeredVehicle;c.THREE.Bird=function(a){function b(a,b,c){e.vertices.push(new THREE.Vector3(a,b,c))}function c(a,b,d){e.faces.push(new THREE.Face3(a,b,d))}a=a||{};void 0==a.color&&
(a.color=6579300);var e=new THREE.Geometry;a=new THREE.MeshBasicMaterial({color:new THREE.Color(a.color),side:THREE.DoubleSide});b(5,0,0);b(-5,-2,1);b(-5,0,0);b(-5,-2,-1);b(0,2,-6);b(0,2,6);b(2,0,0);b(-3,0,0);c(0,2,1);c(0,3,2);c(4,7,6);c(5,6,7);THREE.Mesh.call(this,e,a);this.phase=Math.floor(62.83*Math.random());this.behavior=new boids.SteeredVehicle(0,0,0);this.behavior.maxForce=.15};c.THREE.Bird.prototype=Object.create(THREE.Mesh.prototype);c.THREE.Bird.prototype.seek=function(a){this.behavior.seek(a)};
c.THREE.Bird.prototype.flee=function(a){this.behavior.flee(a)};c.THREE.Bird.prototype.arrive=function(a){this.behavior.arrive(a)};c.THREE.Bird.prototype.patrol=function(a,b){this.behavior.patrol(a,b)};c.THREE.Bird.prototype.tooClose=function(a){this.behavior.tooClose(a)};c.THREE.Bird.prototype.flock=function(a){this.behavior.flock(a)};c.THREE.Bird.prototype.wrap=function(a,b,c){this.behavior.wrap(a,b,c)};c.THREE.Bird.prototype.bounce=function(a,b,c){this.behavior.bounce(a,b,c)};c.THREE.Bird.prototype.wander=
function(){this.behavior.wander()};c.THREE.Bird.prototype.inSight=function(a){return this.behavior.inSight(a)};c.THREE.Bird.prototype.update=function(a){a=a||{};this.behavior.update();this.flap();this.position.x=this.behavior.position.x;this.position.y=this.behavior.position.y;this.position.z=this.behavior.position.z;void 0!=a.color&&(this.material.color=new THREE.Color(a.color))};c.THREE.Bird.prototype.flap=function(){this.rotation.y=Math.atan2(-this.behavior.velocity.z,this.behavior.velocity.x);
this.rotation.z=Math.asin(this.behavior.velocity.y/this.behavior.velocity.length());this.phase=(this.phase+(Math.max(0,this.rotation.z)+.1))%62.83;this.geometry.verticesNeedUpdate=!0;this.geometry.vertices[5].y=this.geometry.vertices[4].y=5*Math.sin(this.phase)};return c}();
