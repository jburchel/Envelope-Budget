package com.envelope.budget

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.BottomNavigation
import androidx.compose.material.BottomNavigationItem
import androidx.compose.material.Icon
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Scaffold
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalance
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.PieChart
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.envelope.budget.ui.auth.AuthScreen
import com.envelope.budget.ui.components.EnvelopeCard
import com.envelope.budget.ui.components.ThemeSelector
import com.envelope.budget.ui.theme.EnvelopeBudgetTheme
import com.envelope.budget.utils.ThemeManager

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Initialize ThemeManager
        ThemeManager.init(applicationContext)
        
        setContent {
            // Collect current theme as state
            val themeType by ThemeManager.currentTheme.collectAsState()
            
            EnvelopeBudgetTheme(themeType = themeType) {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    // For now, we'll show a simple auth placeholder
                    // In a real app, we'd check authentication state first
                    var isLoggedIn by remember { mutableStateOf(false) }
                    
                    if (isLoggedIn) {
                        MainScreenWithBottomNav()
                    } else {
                        AuthScreen(onLoggedIn = { isLoggedIn = true })
                    }
                }
            }
        }
    }
}

@Composable
fun MainScreenWithBottomNav() {
    val navController = rememberNavController()
    
    Scaffold(
        bottomBar = { BottomNav(navController = navController) }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = BottomNavItem.Dashboard.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(BottomNavItem.Dashboard.route) {
                DashboardScreen()
            }
            composable(BottomNavItem.Budget.route) {
                BudgetScreen()
            }
            composable(BottomNavItem.Accounts.route) {
                AccountsScreen()
            }
            composable(BottomNavItem.Reports.route) {
                ReportsScreen()
            }
            composable(BottomNavItem.Settings.route) {
                SettingsScreen()
            }
        }
    }
}

// Sealed class for Bottom Navigation items
sealed class BottomNavItem(val route: String, val icon: ImageVector, val title: String) {
    object Dashboard : BottomNavItem("dashboard", Icons.Default.Home, "Dashboard")
    object Budget : BottomNavItem("budget", Icons.Default.ShoppingCart, "Budget")
    object Accounts : BottomNavItem("accounts", Icons.Default.AccountBalance, "Accounts")
    object Reports : BottomNavItem("reports", Icons.Default.PieChart, "Reports")
    object Settings : BottomNavItem("settings", Icons.Default.Settings, "Settings")
}

@Composable
fun BottomNav(navController: NavController) {
    val items = listOf(
        BottomNavItem.Dashboard,
        BottomNavItem.Budget,
        BottomNavItem.Accounts,
        BottomNavItem.Reports,
        BottomNavItem.Settings
    )
    
    BottomNavigation {
        val navBackStackEntry by navController.currentBackStackEntryAsState()
        val currentRoute = navBackStackEntry?.destination?.route
        
        items.forEach { item ->
            BottomNavigationItem(
                icon = { Icon(item.icon, contentDescription = item.title) },
                label = { Text(text = item.title) },
                selected = currentRoute == item.route,
                onClick = {
                    if (currentRoute != item.route) {
                        navController.navigate(item.route)
                    }
                }
            )
        }
    }
}

// Placeholder screen components
@Composable
fun DashboardScreen() {
    EnvelopeCard(
        title = "Groceries",
        budgeted = 500.0,
        spent = 350.0,
        modifier = Modifier.padding(16.dp)
    )
}

@Composable
fun BudgetScreen() {
    Text(text = "Budget Screen")
}

@Composable
fun AccountsScreen() {
    Text(text = "Accounts Screen")
}

@Composable
fun ReportsScreen() {
    Text(text = "Reports Screen")
}

@Composable
fun SettingsScreen() {
    // Collect current theme as state
    val themeType by ThemeManager.currentTheme.collectAsState()
    
    ThemeSelector(
        currentTheme = themeType,
        onThemeSelected = { ThemeManager.setTheme(it) }
    )
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    EnvelopeBudgetTheme {
        MainScreenWithBottomNav()
    }
} 