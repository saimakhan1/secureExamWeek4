# Quick Setup Script for Online Courses & Payments Feature (Windows/PowerShell)

Write-Host "======================================"
Write-Host "🎓 Online Courses & Payments Setup" -ForegroundColor Cyan
Write-Host "======================================"
Write-Host ""

# Check if Stripe is installed
Write-Host "📦 Checking dependencies..."
$nodeModules = Get-Item "node_modules/stripe" -ErrorAction SilentlyContinue

if ($nodeModules) {
    Write-Host "✅ Stripe package already installed"
} else {
    Write-Host "📦 Installing Stripe package..."
    npm install stripe
    Write-Host "✅ Stripe package installed"
}

Write-Host ""
Write-Host "======================================"
Write-Host "📝 Next Steps:" -ForegroundColor Green
Write-Host "======================================"
Write-Host ""

Write-Host "1️⃣  Update your .env file with Stripe webhook secret:"
Write-Host "   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx" -ForegroundColor Yellow
Write-Host ""

Write-Host "2️⃣  Seed sample courses (optional):"
Write-Host "   node seedCourses.js" -ForegroundColor Yellow
Write-Host ""

Write-Host "3️⃣  Start the development server:"
Write-Host "   npm run dev" -ForegroundColor Yellow
Write-Host ""

Write-Host "4️⃣  Access the features:"
Write-Host "   - Online Courses: http://localhost:3000/dashboard/student/online-courses" -ForegroundColor Cyan
Write-Host "   - Payment History: http://localhost:3000/dashboard/student/payment-history" -ForegroundColor Cyan
Write-Host ""

Write-Host "5️⃣  Configure Stripe Webhook:"
Write-Host "   - Go to https://dashboard.stripe.com/developers/webhooks" -ForegroundColor Cyan
Write-Host "   - Add endpoint: https://yourdomain.com/api/payments/webhook"
Write-Host "   - Events: checkout.session.completed, payment_intent.payment_failed"
Write-Host ""

Write-Host "======================================"
Write-Host "🧪 Test Payment Card:" -ForegroundColor Magenta
Write-Host "======================================"
Write-Host "   Card: 4242 4242 4242 4242"
Write-Host "   Expiry: 12/25 (or any future date)"
Write-Host "   CVC: 123 (any 3 digits)"
Write-Host ""

Write-Host "======================================"
Write-Host "📚 Documentation:" -ForegroundColor Blue
Write-Host "======================================"
Write-Host "   - IMPLEMENTATION_SUMMARY.md"
Write-Host "   - COURSES_PAYMENTS_SETUP.md"
Write-Host ""

Write-Host "✨ Feature setup complete!" -ForegroundColor Green
Write-Host "======================================"
