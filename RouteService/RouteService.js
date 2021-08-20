
class RouteService {
    static changePath(path, history) {
        if(process.browser) window.history.pushState({}, "", path)
        history.push(path)
    }
}

export default RouteService
