import SwiftUI

struct LoginView: View {
    @EnvironmentObject var authViewModel: AuthViewModel
    @State private var email = ""
    @State private var password = ""
    @State private var showError = false
    @State private var errorMessage = ""
    
    // State for navigation
    @State private var navigateToRegister = false
    @State private var navigateToForgotPassword = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                // Logo or app title
                Text("Envelope Budget")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .padding(.bottom, 30)
                
                // Error message
                if showError {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding()
                        .background(Color.red.opacity(0.1))
                        .cornerRadius(8)
                }
                
                // Email field
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(8)
                
                // Password field
                SecureField("Password", text: $password)
                    .padding()
                    .background(Color.gray.opacity(0.2))
                    .cornerRadius(8)
                
                // Login button
                Button(action: login) {
                    Text("Log In")
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(8)
                }
                
                // Navigation links
                HStack {
                    Spacer()
                    
                    NavigationLink(destination: RegisterView(), isActive: $navigateToRegister) {
                        Button(action: { navigateToRegister = true }) {
                            Text("Create Account")
                                .foregroundColor(.blue)
                        }
                    }
                    
                    Spacer()
                    
                    NavigationLink(destination: ForgotPasswordView(), isActive: $navigateToForgotPassword) {
                        Button(action: { navigateToForgotPassword = true }) {
                            Text("Forgot Password?")
                                .foregroundColor(.blue)
                        }
                    }
                    
                    Spacer()
                }
                .padding(.top)
                
                Spacer()
            }
            .padding()
            .navigationBarHidden(true)
        }
    }
    
    private func login() {
        // Validation
        guard !email.isEmpty, !password.isEmpty else {
            errorMessage = "Please enter email and password"
            showError = true
            return
        }
        
        // Call the view model
        authViewModel.login(email: email, password: password)
    }
}

// Preview for SwiftUI canvas
struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
            .environmentObject(AuthViewModel())
    }
} 