# Seller Authentication System

## Overview
Complete seller/artisan authentication system with separate login portal for sellers to manage their business on the Inloom marketplace.

## Features
- ✅ Seller Login
- ✅ Seller Registration (with business details)
- ✅ Form Validation
- ✅ Seller Dashboard Header
- ✅ Session Management
- ✅ Seller Logout
- ✅ Separate from Customer Authentication

## Pages

### Seller Login/Registration Page
**Route:** `/auth/seller-login`

Features:
- Toggle between login and registration modes
- Business-specific form fields
- Comprehensive validation
- Professional seller-focused UI
- Business icon in header
- Redirects to artisans page after login

**Login Fields:**
- Business Email Address
- Password
- Forgot Password link
- Customer Login link

**Registration Fields:**
- Business/Shop Name *
- Owner Full Name *
- Business Email Address *
- Business Type * (dropdown with categories)
- Phone Number *
- Business Address (optional)
- Password *
- Confirm Password *

**Business Type Options:**
- Pottery & Ceramics
- Woodwork & Carpentry
- Textiles & Fabrics
- Jewelry & Accessories
- Painting & Art
- Metalwork
- Glasswork
- Leatherwork
- Other Crafts

**Benefits Section (shown during registration):**
- Reach thousands of customers
- Easy-to-use seller dashboard
- Secure payment processing
- Marketing support and tools
- Low commission rates

### Artisans Page (Seller Dashboard)
**Route:** `/artisans`

Features:
- Shows seller dashboard header when logged in as seller
- Quick access buttons: My Products, Orders, Logout
- Browse all artisans on the platform
- Filter and sort functionality
- "Join as a seller" link for non-sellers

**Dashboard Header (Seller View):**
```
Seller Dashboard
Welcome back! Manage your products and orders
[My Products] [Orders] [Logout]
```

## Authentication Flow

### Seller Login Flow
1. User clicks "Seller/Artisan" button from customer account
2. Redirected to `/auth/seller-login`
3. User enters business email and password
4. On successful login:
   - Seller data stored in `localStorage.seller`
   - `localStorage.isSellerLoggedIn` set to `"true"`
   - Redirect to `/artisans` (seller dashboard)

### Seller Registration Flow
1. User visits `/auth/seller-login`
2. Clicks "Register Now" to toggle to registration
3. Fills in business information
4. Validates all required fields
5. On successful registration:
   - Seller data stored in `localStorage.seller`
   - `localStorage.isSellerLoggedIn` set to `"true"`
   - Redirect to `/artisans` (seller dashboard)

### Seller Logout Flow
1. Seller clicks "Logout" in artisans page dashboard header
2. `localStorage.seller` and `localStorage.isSellerLoggedIn` removed
3. Redirect to `/auth/seller-login`

## LocalStorage Schema

### Seller Data
```typescript
// localStorage.seller
{
  "businessName": "Artisan Workshop",
  "ownerName": "Jane Smith",
  "email": "business@example.com",
  "phone": "+1 234 567 8900",
  "businessType": "Pottery & Ceramics",
  "address": "456 Craft Lane, Art District",
  "isSeller": true
}

// localStorage.isSellerLoggedIn
"true" | null
```

### Customer Data (separate)
```typescript
// localStorage.user
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 234 567 8900",
  "avatar": "JD"
}

// localStorage.isLoggedIn
"true" | null
```

## Utility Functions

Located in: `/app/utils/sellerAuth.ts`

```typescript
interface Seller {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: string;
  address?: string;
  avatar?: string;
}

isSellerAuthenticated(): boolean
getSeller(): Seller | null
setSeller(seller: Seller): void
logoutSeller(): void
loginSeller(email: string, password: string): Promise<Seller>
registerSeller(
  businessName: string,
  ownerName: string,
  email: string,
  password: string,
  businessType: string,
  phone: string,
  address?: string
): Promise<Seller>
```

## Form Validation

### Seller Login
- Business Email: Required, valid email format
- Password: Required, minimum 6 characters

### Seller Registration
- Business Name: Required
- Owner Name: Required
- Business Email: Required, valid email format
- Business Type: Required (must select from dropdown)
- Phone: Required, valid phone format
- Address: Optional
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

## User Journey Examples

### Customer to Seller Flow
1. Customer logs in at `/auth/login`
2. Views account at `/account`
3. Clicks "Seller/Artisan" button
4. Redirected to `/auth/seller-login`
5. Can register as seller (separate account)
6. After registration, manages business at `/artisans`

### Direct Seller Flow
1. Visit `/auth/seller-login` directly
2. Login or register with business details
3. Manage business at `/artisans`
4. Access seller dashboard features

### Artisan Page Visitor Flow
1. Visit `/artisans` to browse artisans
2. See "Join as a seller" link if not logged in as seller
3. Click link to register as seller
4. Complete registration and start selling

## Dual Authentication System

The platform supports **two separate authentication systems**:

1. **Customer Authentication**
   - Login: `/auth/login`
   - Storage: `localStorage.user`, `localStorage.isLoggedIn`
   - Dashboard: `/account`
   - Features: Browse, order, manage profile

2. **Seller Authentication**
   - Login: `/auth/seller-login`
   - Storage: `localStorage.seller`, `localStorage.isSellerLoggedIn`
   - Dashboard: `/artisans`
   - Features: Manage products, orders, business profile

Users can have **both** customer and seller accounts using different email addresses.

## Navigation Links

**Customer Account → Seller Portal:**
- Button: "Seller/Artisan"
- Links to: `/auth/seller-login`

**Seller Portal → Customer Login:**
- Link: "Customer Login"
- Links to: `/auth/login`

**Artisan Page (Not Logged In):**
- Link: "Join as a seller"
- Links to: `/auth/seller-login`

## Styling

Consistent with the project's design system:
- Compact padding (p-1 to p-3)
- Small fonts (text-xs to text-sm)
- Mobile-first responsive design
- Primary color scheme
- shadcn/ui components
- Business icon for seller branding
- Professional seller-focused aesthetics

## Security Notes

⚠️ **Current Implementation:** Client-side demo using localStorage

**For Production, implement:**
1. Backend seller authentication API
2. Separate database tables for sellers
3. Business verification process
4. Email verification for business accounts
5. Document upload (business license, tax ID, etc.)
6. Seller approval workflow
7. Two-factor authentication
8. API rate limiting
9. Secure session management
10. Payment gateway integration for seller payouts

## Future Features (Seller Portal)

### Seller Dashboard
- `/seller/dashboard` - Overview, analytics, recent orders
- `/seller/products` - Product management (add, edit, delete)
- `/seller/orders` - Order fulfillment, shipping
- `/seller/analytics` - Sales reports, trends
- `/seller/profile` - Business profile settings
- `/seller/payments` - Payout history, bank details
- `/seller/reviews` - Customer reviews management
- `/seller/support` - Help and support tickets

### Advanced Features
- Multi-product upload
- Inventory management
- Promotion tools
- Chat with customers
- Shipping label generation
- Tax calculation
- Commission tracking
- Seller training resources

## Testing

**Test Seller Login:**
1. Visit `http://localhost:3000/auth/seller-login`
2. Enter any email (e.g., `seller@test.com`)
3. Enter password (min 6 chars)
4. Click "Sign In to Seller Portal"
5. Redirected to `/artisans` with seller dashboard header

**Test Seller Registration:**
1. Visit `/auth/seller-login`
2. Click "Register Now"
3. Fill in all required fields:
   - Business Name: "My Workshop"
   - Owner Name: "John Artisan"
   - Email: "myshop@example.com"
   - Business Type: Select from dropdown
   - Phone: "+1234567890"
   - Password: "test123"
   - Confirm Password: "test123"
4. Click "Register as Seller"
5. Redirected to `/artisans` as logged-in seller

**Test Seller Logout:**
1. While logged in as seller at `/artisans`
2. See dashboard header at top
3. Click "Logout" button
4. Redirected to `/auth/seller-login`
5. Dashboard header disappears

## File Structure

```
app/
├── auth/
│   ├── login/
│   │   └── page.tsx              # Customer login
│   └── seller-login/
│       └── page.tsx               # Seller login (NEW)
├── utils/
│   ├── auth.ts                    # Customer auth utilities
│   └── sellerAuth.ts              # Seller auth utilities (NEW)
├── account/
│   └── page.tsx                   # Customer account (updated link)
└── artisans/
    └── page.tsx                   # Artisan page with seller dashboard (updated)
```

## API Integration Checklist

When connecting to backend:
- [ ] Replace mock login/register functions in `sellerAuth.ts`
- [ ] Implement JWT token management
- [ ] Add refresh token rotation
- [ ] Implement proper error handling
- [ ] Add business verification endpoints
- [ ] Create seller profile management API
- [ ] Add product management endpoints
- [ ] Implement order management API
- [ ] Add payment/payout APIs
- [ ] Create analytics endpoints
