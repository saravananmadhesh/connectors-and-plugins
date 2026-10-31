# Syncfusion Licensing Overview for WinUI

> **Important:** After obtaining your license key, ensure all Syncfusion NuGet packages (e.g., `Syncfusion.Editors.WinUI`, `Syncfusion.Core.WinUI`) are updated to the latest version for compatibility.

## License Types

### 1. Community License (Free)
**For:** Individual developers, startups, non-profits

- ✓ Free to use
- ✓ All Syncfusion components included
- ✓ Community support only (forums, not priority support)
- ✓ Unlimited deployment
- ✗ No commercial support
- ✗ Limited priority support

**Eligibility:**
- Less than 1 million USD annual gross revenue
- Not a subsidiary of larger company
- Open source projects
- Academic institutions and students

**Registration:** Free account at [Syncfusion.com](https://www.syncfusion.com/products/community)

### 2. Trial License (30 Days)
**For:** Evaluation and testing

- ✓ Full feature set (30 days)
- ✓ All components accessible
- ✓ Functional but displays trial license messages
- ✗ Expires after 30 days
- ✗ Not for production use
- ✗ Watermarks or trial notifications in some components

**Automatic:** Starts when you first use Syncfusion components without a registered license

### 3. Paid License (Commercial)
**For:** Production applications and commercial use

**License Types:**
- **Developer License:** 1 developer, single machine
- **Business License:** Multiple developers, unlimited machines
- **Team License:** Team of developers, unlimited machines
- **Site License:** Entire organization, unlimited developers/machines

**Includes:**
- ✓ All components and features
- ✓ Priority technical support
- ✓ Regular updates and bug fixes
- ✓ 1-year license validity
- ✓ Production deployment rights

**Pricing:** Contact sales at [Syncfusion Sales](https://www.syncfusion.com/sales/team-license)

### 4. OEM/Redistribution License
**For:** Redistributing applications with embedded Syncfusion components

- ✓ Bundle components with your product
- ✓ License per deployment
- ✗ Volume-based pricing
- ✗ Requires special negotiation

Contact: [Syncfusion Sales](https://www.syncfusion.com/sales/team-license)

---

## Obtaining a License Key

### Step 1: Create Syncfusion Account
1. Go to [Syncfusion.com/accounts](https://accounts.syncfusion.com/auth/register)
2. Register with email or existing account
3. Verify email address

### Step 2: Activate License
Navigate to [License Dashboard](https://www.syncfusion.com/account/license-management):

**For Community License:**
1. Click "Get Community License"
2. Accept terms
3. License key automatically generated
4. Key appears in License Management dashboard

**For Trial License:**
1. Start using Syncfusion components
2. License automatically generated on first use
3. Check email for license details

**For Purchased License:**
1. Log in to Syncfusion account
2. Go to License Management
3. View purchased licenses with keys
4. Download license certificate (optional)

### Step 3: Copy License Key
From License Management dashboard:
- Locate your license key (looks like: `Mzk1OTAyQDMxMzkyZTM0MmUzMGQ0NW...`)
- Copy the complete key (important: get entire key)

---

## License Key Format and Validity

### Key Format
```
Mzk1OTAyQDMxMzkyZTM0MmUzMGQ0NWNmVmh...
(Base64 encoded, typically 200-400 characters)
```

### Validity Checking
**Online Check:**
- License valid for 1 year from purchase date
- License can be renewed annually
- Multiple licenses can be active on one account

**Offline Check:**
- License works without internet (after initial validation)
- Trial license: 30 days from first use
- Paid license: 1 year from activation date

### Expiration Behavior
- **Before Expiration:** Component works normally
- **At Expiration:** Trial notifications appear or component stops functioning
- **After Expiration (Trial):** Components show trial message or are disabled
- **After Expiration (Paid):** Contact support for renewal or downgrade to community

---

## Community License Eligibility

### Who Qualifies?

✓ **Eligible:**
- Individual developers (freelance)
- Startups with <$1M annual revenue
- Non-profit organizations
- Open source projects
- Academic institutions and students
- Government agencies

✗ **NOT Eligible:**
- Companies with >$1M annual gross revenue
- Subsidiaries of larger companies
- Commercial for-profit entities
- Apps generating revenue

### Community License Terms
- Free forever (no expiration)
- Unlimited deployment
- All Syncfusion components included
- Community forum support only
- License available to registered members

**Apply:** [Syncfusion Community License](https://www.syncfusion.com/products/community)

---

## Registering Syncfusion Account for NuGet.org Users

### Issue: "License Required" Warning

When you pull Syncfusion packages from NuGet without a registered account:

```
License required to create Syncfusion component.
Please register the license in your application.
```

### Solution: Register Account for NuGet

1. **Create/Log In to Syncfusion Account**
   - Visit [accounts.syncfusion.com](https://accounts.syncfusion.com)
   - Create account or log in

2. **Generate License Key**
   - Go to [License Management](https://www.syncfusion.com/account/license-management)
   - Select license type (Community, Trial, or Purchased)
   - Copy license key

3. **Store License Securely**
   - Do NOT commit to version control
   - Use environment variables or secure vaults
   - Example: `SYNCFUSION_LICENSE_KEY` environment variable

---

## Trial vs. Purchased License

| Feature | Trial (30 days) | Community (Free) | Purchased |
|---------|-----------------|-----------------|-----------|
| Cost | Free | Free | Paid |
| Duration | 30 days | Unlimited | 1 year |
| Components | All | All | All |
| Support | None | Community forums | Priority support |
| Commercial use | ✗ | ✗ (depends on revenue) | ✓ |
| Production deployment | ✗ | Limited | ✓ |
| Watermarks/notifications | Yes (some components) | No | No |

**When to upgrade:**
- Trial expired: Upgrade to Community or Purchased
- Commercial deployment: Use Community or Purchased
- Priority support needed: Use Purchased
- Revenue >$1M: Upgrade to Purchased license

---

## Syncfusion Account Management

### Update License Information
1. Log in to [accounts.syncfusion.com](https://accounts.syncfusion.com)
2. Go to Account Settings
3. Update profile or account information
4. Changes effective immediately

### Change or Update License
1. Go to [License Management](https://www.syncfusion.com/account/license-management)
2. View all your licenses
3. Generate new license key if needed
4. Download license certificate (optional)

### Multiple Licenses
You can have multiple licenses:
- Different license types for different projects
- Multiple copies of same license (e.g., multiple developer licenses)
- Trial + Community + Purchased all on one account

---

## License Activation Workflow

### Typical Flow for New Developer

```
1. Download Syncfusion NuGet packages
   ↓
2. Get "License required" message
   ↓
3. Create Syncfusion account at accounts.syncfusion.com
   ↓
4. Register for Community License or start Trial
   ↓
5. Copy license key from License Management dashboard
   ↓
6. Register license in your code
   ↓
7. Component now works (trial or community mode)
   ↓
8. Ready to use in development
```

### When Upgrading to Purchased License

```
1. Purchase license from Syncfusion sales
   ↓
2. Log in to license management dashboard
   ↓
3. View new purchased license key
   ↓
4. Update license registration in code with new key
   ↓
5. Test components in production mode
   ↓
6. Deploy to production with new license
```

---

## Getting License Support

### Where to Get License Key
- **Syncfusion Account:** [accounts.syncfusion.com/license-management](https://www.syncfusion.com/account/license-management)
- **License Email:** Check registration confirmation email
- **Support Portal:** [support.syncfusion.com](https://support.syncfusion.com)

### License Issues
**Lost license key?**
- Log in to account → License Management → Copy key

**License expired?**
- Community license: Never expires
- Trial license: 30 days, then upgrade
- Purchased license: 1 year, then renew

**Not receiving license email?**
- Check spam folder
- Verify account email address
- Resend license from dashboard

### Getting Help
- **Community Support:** [Syncfusion Forums](https://www.syncfusion.com/forums)
- **Priority Support:** For purchased license holders
- **Sales:** [sales@syncfusion.com](mailto:sales@syncfusion.com)
- **Support Portal:** [support.syncfusion.com](https://support.syncfusion.com)
