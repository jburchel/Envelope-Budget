package com.envelope.budget.ui.auth

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.envelope.budget.R
import com.envelope.budget.ui.theme.EnvelopeTheme

@Composable
fun AuthScreen(onLoggedIn: () -> Unit) {
    var isLogin by remember { mutableStateOf(true) }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var confirmPassword by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }

    val theme = EnvelopeTheme.currentTheme

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(48.dp))
        
        // App Logo
        Image(
            painter = painterResource(id = R.drawable.app_logo),
            contentDescription = "App Logo",
            modifier = Modifier
                .size(120.dp)
                .padding(bottom = 24.dp)
        )
        
        Text(
            text = if (isLogin) "Welcome Back" else "Create Account",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = theme.primary
        )
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // Email field
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            leadingIcon = { 
                Icon(
                    imageVector = Icons.Default.Email,
                    contentDescription = "Email",
                    tint = theme.primary
                )
            },
            modifier = Modifier.fillMaxWidth(),
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = theme.primary,
                unfocusedBorderColor = theme.secondary.copy(alpha = 0.5f),
                cursorColor = theme.primary
            )
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Password field
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            leadingIcon = { 
                Icon(
                    imageVector = Icons.Default.Lock,
                    contentDescription = "Password",
                    tint = theme.primary
                )
            },
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        imageVector = if (passwordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility,
                        contentDescription = "Toggle password visibility",
                        tint = theme.primary
                    )
                }
            },
            visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
            modifier = Modifier.fillMaxWidth(),
            colors = TextFieldDefaults.outlinedTextFieldColors(
                focusedBorderColor = theme.primary,
                unfocusedBorderColor = theme.secondary.copy(alpha = 0.5f),
                cursorColor = theme.primary
            )
        )
        
        // Confirm Password field (only for signup)
        if (!isLogin) {
            Spacer(modifier = Modifier.height(16.dp))
            OutlinedTextField(
                value = confirmPassword,
                onValueChange = { confirmPassword = it },
                label = { Text("Confirm Password") },
                leadingIcon = { 
                    Icon(
                        imageVector = Icons.Default.Lock,
                        contentDescription = "Confirm Password",
                        tint = theme.primary
                    )
                },
                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                modifier = Modifier.fillMaxWidth(),
                colors = TextFieldDefaults.outlinedTextFieldColors(
                    focusedBorderColor = theme.primary,
                    unfocusedBorderColor = theme.secondary.copy(alpha = 0.5f),
                    cursorColor = theme.primary
                )
            )
        }
        
        Spacer(modifier = Modifier.height(24.dp))
        
        // Login/Signup Button
        Button(
            onClick = { 
                // In a real app, we would validate and authenticate
                onLoggedIn() 
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(
                backgroundColor = theme.primary,
                contentColor = Color.White
            ),
            shape = RoundedCornerShape(8.dp)
        ) {
            Text(
                text = if (isLogin) "Login" else "Sign Up",
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
        }
        
        Spacer(modifier = Modifier.height(16.dp))
        
        // Switch between login and signup
        TextButton(onClick = { isLogin = !isLogin }) {
            Text(
                text = if (isLogin) "Need an account? Sign Up" else "Already have an account? Login",
                color = theme.primary
            )
        }
        
        // For demo purposes
        Spacer(modifier = Modifier.weight(1f))
        TextButton(
            onClick = { onLoggedIn() }, 
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text(
                text = "Skip Login (Demo)",
                color = theme.tertiary
            )
        }
    }
} 