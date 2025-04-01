package com.envelope.budget

import android.app.Application
import com.envelope.budget.utils.ThemeManager

class EnvelopeBudgetApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize ThemeManager
        ThemeManager.init(applicationContext)
    }
} 