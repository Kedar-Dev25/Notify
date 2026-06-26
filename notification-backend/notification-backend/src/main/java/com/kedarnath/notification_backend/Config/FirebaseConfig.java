@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void init() throws Exception {

        String firebaseConfig = System.getenv("FIREBASE_CONFIG");

        InputStream serviceAccount =
                new ByteArrayInputStream(firebaseConfig.getBytes());

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        System.out.println("Firebase initialized successfully");
    }
}