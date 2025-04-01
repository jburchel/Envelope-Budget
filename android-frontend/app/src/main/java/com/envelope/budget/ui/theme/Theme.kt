package com.envelope.budget.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material.Colors
import androidx.compose.material.MaterialTheme
import androidx.compose.material.darkColors
import androidx.compose.material.lightColors
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

// Defines local composition for our theme
private val LocalEnvelopeTheme = staticCompositionLocalOf { ThemeColors.Classic }

// Material color schemes
private val DarkColorPalette = darkColors(
    primary = Blue500,
    primaryVariant = Blue700,
    secondary = Teal200
)

private val LightColorPalette = lightColors(
    primary = Blue500,
    primaryVariant = Blue700,
    secondary = Teal200,
    background = Color.White,
    surface = Color.White,
    onPrimary = Color.White,
    onSecondary = Color.Black,
    onBackground = Color.Black,
    onSurface = Color.Black
)

@Composable
fun EnvelopeBudgetTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    themeType: ThemeType = ThemeType.CLASSIC,
    content: @Composable () -> Unit
) {
    val colors = if (darkTheme) {
        DarkColorPalette
    } else {
        LightColorPalette
    }

    // Choose the appropriate theme colors based on selected theme
    val envelopeThemeColors = when (themeType) {
        ThemeType.CLASSIC -> ThemeColors.Classic
        ThemeType.MODERN -> ThemeColors.Modern
        ThemeType.ROYAL -> ThemeColors.Royal
        ThemeType.COASTAL -> ThemeColors.Coastal
        ThemeType.PRIORITY -> ThemeColors.Priority
    }

    CompositionLocalProvider(LocalEnvelopeTheme provides envelopeThemeColors) {
        MaterialTheme(
            colors = colors,
            typography = Typography,
            shapes = Shapes,
            content = content
        )
    }
}

// Access theme from anywhere in the composable hierarchy
object EnvelopeTheme {
    val currentTheme: ThemeColors
        @Composable
        get() = LocalEnvelopeTheme.current
}

// Available theme types
enum class ThemeType {
    CLASSIC,
    MODERN,
    ROYAL,
    COASTAL,
    PRIORITY
}

// Theme colors data class to hold our custom theme colors
data class ThemeColors(
    val primary: Color,
    val secondary: Color,
    val tertiary: Color,
    val background: Color,
    val surface: Color,
    val envelopeLight: Color,
    val envelopeDark: Color,
    val text: Color,
    val error: Color
) {
    companion object {
        val Classic = ThemeColors(
            primary = Blue500,
            secondary = Teal200,
            tertiary = Orange500,
            background = Color.White,
            surface = Color(0xFFF5F5F5),
            envelopeLight = Color(0xFFE3F2FD),
            envelopeDark = Color(0xFF90CAF9),
            text = Color(0xFF333333),
            error = Red500
        )
        
        val Modern = ThemeColors(
            primary = Color(0xFF6200EE),
            secondary = Color(0xFF03DAC5),
            tertiary = Color(0xFFFF5722),
            background = Color.White,
            surface = Color(0xFFF7F7F7),
            envelopeLight = Color(0xFFEDE7F6),
            envelopeDark = Color(0xFFB39DDB),
            text = Color(0xFF333333),
            error = Color(0xFFB00020)
        )
        
        val Royal = ThemeColors(
            primary = Color(0xFF5C6BC0),
            secondary = Color(0xFFFFB74D),
            tertiary = Color(0xFF4DB6AC),
            background = Color.White,
            surface = Color(0xFFF8F8F8),
            envelopeLight = Color(0xFFE8EAF6),
            envelopeDark = Color(0xFF9FA8DA),
            text = Color(0xFF333333),
            error = Color(0xFFC62828)
        )
        
        val Coastal = ThemeColors(
            primary = Color(0xFF4DD0E1),
            secondary = Color(0xFFFFA726),
            tertiary = Color(0xFF81C784),
            background = Color.White,
            surface = Color(0xFFF5F5F5),
            envelopeLight = Color(0xFFE0F7FA),
            envelopeDark = Color(0xFF80DEEA),
            text = Color(0xFF333333),
            error = Color(0xFFEF5350)
        )
        
        val Priority = ThemeColors(
            primary = Color(0xFF43A047),
            secondary = Color(0xFFEC407A),
            tertiary = Color(0xFF42A5F5),
            background = Color.White,
            surface = Color(0xFFF9F9F9),
            envelopeLight = Color(0xFFE8F5E9),
            envelopeDark = Color(0xFFA5D6A7),
            text = Color(0xFF333333),
            error = Color(0xFFE53935)
        )
    }
} 