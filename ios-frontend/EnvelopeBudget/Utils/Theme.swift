import SwiftUI

// Theme definitions matching the web application
struct EnvelopeTheme {
    static let shared = EnvelopeTheme()
    
    // All available themes
    let themes: [String: ThemeColors] = [
        "classic": ThemeColors(
            primary: Color(hex: "#2E7D32"),     // forest green
            secondary: Color(hex: "#D4C19C"),    // kraft paper
            accent: Color(hex: "#795548"),       // brown
            background: Color(hex: "#F5F3ED"),   // off-white
            text: Color(hex: "#333333"),         // dark gray
            headerBg: Color(hex: "#2E7D32"),
            headerText: Color.white,
            success: Color(hex: "#4CAF50"),      // green
            error: Color(hex: "#F44336")         // red
        ),
        "modern": ThemeColors(
            primary: Color(hex: "#1976D2"),      // blue
            secondary: Color(hex: "#BBDEFB"),    // light blue
            accent: Color(hex: "#FF5722"),       // orange postmark
            background: Color(hex: "#FAFAFA"),   // off-white
            text: Color(hex: "#212121"),         // dark gray
            headerBg: Color(hex: "#1976D2"),
            headerText: Color.white,
            success: Color(hex: "#4CAF50"),
            error: Color(hex: "#F44336")
        ),
        "royal": ThemeColors(
            primary: Color(hex: "#673AB7"),      // purple
            secondary: Color(hex: "#D1C4E9"),    // light purple
            accent: Color(hex: "#FFC107"),       // gold
            background: Color(hex: "#F3F1F8"),   // light purple-gray
            text: Color(hex: "#311B92"),         // deep purple
            headerBg: Color(hex: "#4A148C"),
            headerText: Color.white,
            success: Color(hex: "#4CAF50"),
            error: Color(hex: "#F44336")
        ),
        "coastal": ThemeColors(
            primary: Color(hex: "#00897B"),      // teal
            secondary: Color(hex: "#B2DFDB"),    // light teal
            accent: Color(hex: "#FF7043"),       // coral
            background: Color(hex: "#E0F2F1"),   // very light teal
            text: Color(hex: "#00352C"),         // dark teal
            headerBg: Color(hex: "#00695C"),
            headerText: Color.white,
            success: Color(hex: "#4CAF50"),
            error: Color(hex: "#F44336")
        ),
        "priority": ThemeColors(
            primary: Color(hex: "#212121"),      // black
            secondary: Color(hex: "#BDBDBD"),    // gray
            accent: Color(hex: "#D32F2F"),       // red
            background: Color(hex: "#F5F5F5"),   // very light gray
            text: Color(hex: "#212121"),         // black
            headerBg: Color(hex: "#212121"),
            headerText: Color.white,
            success: Color(hex: "#4CAF50"),
            error: Color(hex: "#F44336")
        )
    ]
    
    // Current theme (default: classic)
    private var currentThemeName: String = "classic"
    
    // Get current theme colors
    var current: ThemeColors {
        return themes[currentThemeName] ?? themes["classic"]!
    }
    
    // Change theme
    mutating func setTheme(name: String) {
        if themes[name] != nil {
            currentThemeName = name
            // Save to UserDefaults
            UserDefaults.standard.set(name, forKey: "user_theme")
        }
    }
    
    // Load theme from UserDefaults
    mutating func loadSavedTheme() {
        if let savedTheme = UserDefaults.standard.string(forKey: "user_theme") {
            if themes[savedTheme] != nil {
                currentThemeName = savedTheme
            }
        }
    }
}

// Theme colors structure
struct ThemeColors {
    let primary: Color
    let secondary: Color
    let accent: Color
    let background: Color
    let text: Color
    let headerBg: Color
    let headerText: Color
    let success: Color
    let error: Color
}

// Extension to create Color from hex string
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
} 