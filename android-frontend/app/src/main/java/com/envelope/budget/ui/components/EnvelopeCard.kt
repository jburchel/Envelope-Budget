package com.envelope.budget.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
import androidx.compose.material.LinearProgressIndicator
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.envelope.budget.ui.theme.EnvelopeShape
import com.envelope.budget.ui.theme.EnvelopeTheme
import com.envelope.budget.ui.theme.EnvelopeBudgetTheme
import java.text.NumberFormat
import java.util.*

@Composable
fun EnvelopeCard(
    title: String,
    budgeted: Double,
    spent: Double,
    modifier: Modifier = Modifier
) {
    val theme = EnvelopeTheme.currentTheme
    val progress = if (budgeted > 0) (spent / budgeted).toFloat() else 0f
    val progressColor = when {
        progress >= 1.0f -> theme.error
        progress >= 0.85f -> Color(0xFFFFA726) // Orange warning color
        else -> theme.primary
    }
    
    val currencyFormatter = NumberFormat.getCurrencyInstance(Locale.US)
    
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = 4.dp,
        shape = EnvelopeShape,
        backgroundColor = theme.surface
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // Envelope flap decoration
            Canvas(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(24.dp)
            ) {
                val width = size.width
                val height = size.height
                
                val path = Path().apply {
                    moveTo(0f, height)
                    lineTo(width/2, 0f)
                    lineTo(width, height)
                    close()
                }
                
                drawPath(
                    path = path,
                    color = theme.envelopeDark
                )
            }
            
            Spacer(modifier = Modifier.height(8.dp))
            
            // Envelope content
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(theme.envelopeLight, RoundedCornerShape(8.dp))
                    .padding(12.dp)
            ) {
                Text(
                    text = title,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = theme.text
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Budget: ${currencyFormatter.format(budgeted)}",
                        fontWeight = FontWeight.Medium,
                        color = theme.text
                    )
                    
                    Text(
                        text = "Spent: ${currencyFormatter.format(spent)}",
                        fontWeight = FontWeight.Medium,
                        color = if (spent > budgeted) theme.error else theme.text
                    )
                }
                
                Spacer(modifier = Modifier.height(8.dp))
                
                LinearProgressIndicator(
                    progress = minOf(progress, 1.0f),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(10.dp)
                        .clip(RoundedCornerShape(5.dp)),
                    color = progressColor,
                    backgroundColor = Color.LightGray.copy(alpha = 0.3f)
                )
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Text(
                    text = "${(progress * 100).toInt()}% used",
                    fontSize = 12.sp,
                    textAlign = TextAlign.End,
                    modifier = Modifier.fillMaxWidth(),
                    color = if (progress >= 1.0f) theme.error else theme.text.copy(alpha = 0.7f)
                )
                
                if (progress >= 1.0f) {
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "⚠️ Over budget by ${currencyFormatter.format(spent - budgeted)}",
                        color = theme.error,
                        fontWeight = FontWeight.Medium,
                        fontSize = 14.sp
                    )
                }
                
                Spacer(modifier = Modifier.height(4.dp))
                
                Text(
                    text = "Remaining: ${currencyFormatter.format(budgeted - spent)}",
                    fontWeight = FontWeight.Bold,
                    color = if (spent > budgeted) theme.error else theme.primary
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun EnvelopeCardPreview() {
    EnvelopeBudgetTheme {
        Column(modifier = Modifier.padding(16.dp)) {
            EnvelopeCard(
                title = "Groceries",
                budgeted = 500.0,
                spent = 350.0
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            EnvelopeCard(
                title = "Entertainment",
                budgeted = 200.0,
                spent = 220.0
            )
        }
    }
} 