import SwiftUI

@main
struct EnvelopeBudgetApp: App {
    // State for managing authentication
    @StateObject private var authViewModel = AuthViewModel()
    
    var body: some Scene {
        WindowGroup {
            if authViewModel.isAuthenticated {
                // Main app with tab view
                MainTabView()
                    .environmentObject(authViewModel)
            } else {
                // Authentication flow
                LoginView()
                    .environmentObject(authViewModel)
            }
        }
    }
}

// Main Tab View
struct MainTabView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    
    var body: some View {
        TabView {
            // Dashboard Tab
            NavigationView {
                Text("Dashboard")
                    .navigationTitle("Dashboard")
            }
            .tabItem {
                Label("Dashboard", systemImage: "house")
            }
            
            // Budget Tab
            NavigationView {
                Text("Budget")
                    .navigationTitle("Budget")
            }
            .tabItem {
                Label("Budget", systemImage: "envelope")
            }
            
            // Accounts Tab
            NavigationView {
                Text("Accounts")
                    .navigationTitle("Accounts")
            }
            .tabItem {
                Label("Accounts", systemImage: "creditcard")
            }
            
            // Reports Tab
            NavigationView {
                Text("Reports")
                    .navigationTitle("Reports")
            }
            .tabItem {
                Label("Reports", systemImage: "chart.bar")
            }
            
            // Settings Tab
            NavigationView {
                VStack {
                    Text("Settings")
                    Button("Logout") {
                        authViewModel.logout()
                    }
                    .padding()
                    .background(Color.red)
                    .foregroundColor(.white)
                    .cornerRadius(8)
                }
                .navigationTitle("Settings")
            }
            .tabItem {
                Label("Settings", systemImage: "gear")
            }
        }
    }
}

// Auth View Model (placeholder)
class AuthViewModel: ObservableObject {
    @Published var isAuthenticated = false
    
    func login(email: String, password: String) {
        // TODO: Implement actual authentication
        isAuthenticated = true
    }
    
    func register(name: String, email: String, password: String) {
        // TODO: Implement actual registration
        isAuthenticated = true
    }
    
    func logout() {
        isAuthenticated = false
    }
} 