const fs = require("fs");
const path = require("path");

function loadRouters(app, routePath = "/api", routerDir = path.join(__dirname)) {
    fs.readdirSync(routerDir).forEach(file => {
        const fullPath = path.join(routerDir, file);
        const routeName = path.basename(file, ".js");
        const router = require(fullPath);
        if(routeName.toLowerCase() === "loadrouters") return;
        const mountPath = routeName.toLowerCase() === "dangnhap"? `${routePath}/login`: `${routePath}/${routeName}`;
        console.log(mountPath);
        app.use(mountPath, router);
    });
}
module.exports = loadRouters;