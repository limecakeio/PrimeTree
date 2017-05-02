//package BackendServer.Authentification;
//
//import java.util.concurrent.atomic.AtomicInteger;
//
//import javax.servlet.http.HttpSessionEvent;
//import javax.servlet.http.HttpSessionListener;
//
//public class SessionListener implements HttpSessionListener {
//
////    private final AtomicInteger activeSessions;
////
////    private final Counter counterOfActiveSessions;
////
////    public SessionListener() {
////        super();
////
////        activeSessions = new AtomicInteger();
////        counterOfActiveSessions = MetricRegistrySingleton.metrics.counter("web.sessions.active.count");
////    }
////
////    // API
////
////    public final int getTotalActiveSession() {
////        return activeSessions.get();
////    }
////
//    @Override
//    public final void sessionCreated(final HttpSessionEvent event) {
//    }
//
//    @Override
//    public final void sessionDestroyed(final HttpSessionEvent event) {
//    }
//
//}
