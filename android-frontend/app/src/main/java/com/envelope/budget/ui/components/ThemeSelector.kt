package com.envelope.budget.ui.components

import android.content.Context
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Card
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.envelope.budget.ui.theme.EnvelopeBudgetTheme
import com.envelope.budget.ui.theme.ThemeColors
import com.envelope.budget.ui.theme.ThemeType

@Composable
fun ThemeSelector(
    currentTheme: ThemeType,
    onThemeSelected: (ThemeType) -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Text(
            text = "Select Theme",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        
        LazyRow(
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            items(ThemeType.values()) { themeType ->
                ThemeOption(
                    themeType = themeType,
                    isSelected = themeType == currentTheme,
                    onSelected = { onThemeSelected(themeType) }
                )
            }
        }
    }
}

@Composable
private fun ThemeOption(
    themeType: ThemeType,
    isSelected: Boolean,
    onSelected: () -> Unit
) {
    val themeColors = when (themeType) {
        ThemeType.CLASSIC -> ThemeColors.Classic
        ThemeType.MODERN -> ThemeColors.Modern
        ThemeType.ROYAL -> ThemeColors.Royal
        ThemeType.COASTAL -> ThemeColors.Coastal
        ThemeType.PRIORITY -> ThemeColors.Priority
    }
    
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier.clickable { onSelected() }
    ) {
        Card(
            modifier = Modifier.size(60.dp),
            shape = CircleShape,
            border = if (isSelected) BorderStroke(2.dp, Color.Black) else null,
            elevation = if (isSelected) 4.dp else 1.dp
        ) {
            Row(modifier = Modifier.fillMaxSize()) {
                Box(
                    modifier = Modifier
                        .fillMaxHeight()
                        .weight(1f)
                        .padding(4.dp)
                        .padding(start = 8.dp)
                ) {
                    Surface(
                        color = themeColors.primary,
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape
                    ) {}
                }
                
                Box(
                    modifier = Modifier
                        .fillMaxHeight()
                        .weight(1f)
                        .padding(4.dp)
                ) {
                    Surface(
                        color = themeColors.secondary,
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape
                    ) {}
                }
                
                Box(
                    modifier = Modifier
                        .fillMaxHeight()
                        .weight(1f)
                        .padding(4.dp)
                        .padding(end = 8.dp)
                ) {
                    Surface(
                        color = themeColors.tertiary,
                        modifier = Modifier.fillMaxSize(),
                        shape = CircleShape
                    ) {}
                }
            }
        }
        
        Spacer(modifier = Modifier.height(4.dp))
        
        Text(
            text = themeType.name.lowercase().replaceFirstChar { it.uppercase() },
            fontSize = 12.sp,
            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
        )
    }
}

@Composable
fun rememberThemeState(context: Context): MutableState<ThemeType> {
    val preferences = context.getSharedPreferences("app_preferences", Context.MODE_PRIVATE)
    val savedTheme = preferences.getString("selected_theme", ThemeType.CLASSIC.name)
    val initialTheme = ThemeType.valueOf(savedTheme ?: ThemeType.CLASSIC.name)
    
    val themeState = remember { mutableStateOf(initialTheme) }
    
    return themeState
}

@Preview(showBackground = true)
@Composable
fun ThemeSelectorPreview() {
    EnvelopeBudgetTheme {
        var selectedTheme by remember { mutableStateOf(ThemeType.CLASSIC) }
        
        ThemeSelector(
            currentTheme = selectedTheme,
            onThemeSelected = { selectedTheme = it }
        )
    }
} 