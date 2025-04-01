package com.envelope.budget.utils

import android.content.Context
import android.content.SharedPreferences
import com.envelope.budget.ui.theme.ThemeType
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * ThemeManager handles saving and retrieving theme preferences
 */
object ThemeManager {
    private const val PREFS_NAME = "envelope_budget_prefs"
    private const val THEME_KEY = "selected_theme"
    
    private lateinit var preferences: SharedPreferences
    private val _currentTheme = MutableStateFlow(ThemeType.CLASSIC)
    val currentTheme: StateFlow<ThemeType> = _currentTheme.asStateFlow()
    
    /**
     * Initialize the ThemeManager with a context
     */
    fun init(context: Context) {
        preferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        loadSavedTheme()
    }
    
    /**
     * Set the current theme and save it to preferences
     */
    fun setTheme(themeType: ThemeType) {
        _currentTheme.value = themeType
        saveTheme(themeType)
    }
    
    /**
     * Save theme to SharedPreferences
     */
    private fun saveTheme(themeType: ThemeType) {
        preferences.edit()
            .putString(THEME_KEY, themeType.name)
            .apply()
    }
    
    /**
     * Load the saved theme from SharedPreferences
     */
    private fun loadSavedTheme() {
        val savedThemeName = preferences.getString(THEME_KEY, ThemeType.CLASSIC.name)
        try {
            val themeType = ThemeType.valueOf(savedThemeName ?: ThemeType.CLASSIC.name)
            _currentTheme.value = themeType
        } catch (e: IllegalArgumentException) {
            // If the saved theme name is invalid, use the default theme
            _currentTheme.value = ThemeType.CLASSIC
        }
    }
    
    /**
     * Get the next theme in the rotation
     */
    fun getNextTheme(): ThemeType {
        val currentThemeValue = _currentTheme.value
        val themeValues = ThemeType.values()
        val nextIndex = (themeValues.indexOf(currentThemeValue) + 1) % themeValues.size
        return themeValues[nextIndex]
    }
} 