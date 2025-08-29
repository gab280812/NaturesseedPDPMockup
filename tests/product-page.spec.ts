import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/product/horse-pasture-mix-warm-season');
  });

  test('should display product title and rating', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Horse Pasture Mix | Warm Season' })).toBeVisible();
    await expect(page.locator('[data-testid="product-rating"]')).toBeVisible();
  });

  test('should change variant and update price', async ({ page }) => {
    // Get initial price
    const initialPrice = await page.locator('[data-testid="product-price"]').textContent();
    
    // Change variant
    await page.getByRole('combobox', { name: /size/i }).click();
    await page.getByRole('option', { name: /25 lb/i }).click();
    
    // Check price updated
    const newPrice = await page.locator('[data-testid="product-price"]').textContent();
    expect(newPrice).not.toBe(initialPrice);
  });

  test('should update quantity with stepper controls', async ({ page }) => {
    const quantityInput = page.locator('input[type="number"]').first();
    
    // Initial quantity should be 1
    await expect(quantityInput).toHaveValue('1');
    
    // Click plus button
    await page.getByRole('button', { name: 'Increase quantity' }).click();
    await expect(quantityInput).toHaveValue('2');
    
    // Click minus button
    await page.getByRole('button', { name: 'Decrease quantity' }).click();
    await expect(quantityInput).toHaveValue('1');
    
    // Minus button should be disabled at quantity 1
    await expect(page.getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
  });

  test('should open coverage calculator and apply quantity', async ({ page }) => {
    // Open coverage calculator
    await page.getByRole('button', { name: /coverage calculator/i }).click();
    
    // Fill in area
    await page.getByPlaceholder('Enter area').fill('5000');
    
    // Should show recommendations
    await expect(page.getByText('Recommendations')).toBeVisible();
    
    // Click apply quantity on first recommendation
    await page.getByRole('button', { name: 'Apply Quantity' }).first().click();
    
    // Dialog should close and quantity should be updated
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should add to cart and show success', async ({ page }) => {
    // Click add to cart
    await page.getByRole('button', { name: 'ADD TO CART' }).click();
    
    // Should show loading state briefly
    await expect(page.getByRole('button', { name: 'Adding...' })).toBeVisible();
    
    // Wait for completion
    await page.waitForTimeout(1000);
  });

  test('should toggle wishlist', async ({ page }) => {
    const wishlistButton = page.getByRole('button', { name: /add to wishlist/i });
    
    // Click wishlist button
    await wishlistButton.click();
    
    // Heart should be filled (visual change)
    await expect(wishlistButton.locator('svg')).toHaveClass(/fill-red-500/);
  });

  test('should navigate to reviews section when rating is clicked', async ({ page }) => {
    // Click on review count link
    await page.getByRole('link', { name: /reviews/i }).click();
    
    // Should scroll to reviews section
    await expect(page.locator('#reviews')).toBeInViewport();
  });

  test('should filter reviews by rating', async ({ page }) => {
    // Navigate to reviews section
    await page.locator('#reviews').scrollIntoViewIfNeeded();
    
    // Filter by 5 stars
    await page.getByRole('combobox', { name: /filter by rating/i }).click();
    await page.getByRole('option', { name: '5 Stars' }).click();
    
    // All visible reviews should have 5 stars
    const reviewRatings = page.locator('[data-testid="review-rating"]');
    const count = await reviewRatings.count();
    
    for (let i = 0; i < count; i++) {
      const stars = reviewRatings.nth(i).locator('.fill-yellow-400');
      await expect(stars).toHaveCount(5);
    }
  });

  test('should open write review dialog and submit', async ({ page }) => {
    // Navigate to reviews section
    await page.locator('#reviews').scrollIntoViewIfNeeded();
    
    // Click write review
    await page.getByRole('button', { name: 'Write a Review' }).click();
    
    // Fill out form
    await page.locator('button[type="button"]').nth(4).click(); // Click 5th star
    await page.getByPlaceholder('Summarize your experience').fill('Great product!');
    await page.getByPlaceholder('Tell others about your experience').fill('This seed mix worked perfectly for my horse pasture. Highly recommend!');
    await page.getByPlaceholder('Enter your name').fill('Test User');
    
    // Submit review
    await page.getByRole('button', { name: 'Submit Review' }).click();
    
    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should open ask question dialog and submit', async ({ page }) => {
    // Navigate to Q&A section
    await page.locator('#qa').scrollIntoViewIfNeeded();
    
    // Click ask question
    await page.getByRole('button', { name: 'Ask a Question' }).click();
    
    // Fill out form
    await page.getByPlaceholder('What would you like to know about this product?').fill('How long does this seed take to establish?');
    await page.getByPlaceholder('Enter your name').fill('Test User');
    
    // Submit question
    await page.getByRole('button', { name: 'Submit Question' }).click();
    
    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should vote helpful on review', async ({ page }) => {
    // Navigate to reviews section
    await page.locator('#reviews').scrollIntoViewIfNeeded();
    
    // Click helpful on first review
    const helpfulButton = page.getByRole('button', { name: /helpful/i }).first();
    const initialText = await helpfulButton.textContent();
    
    await helpfulButton.click();
    
    // Button should be disabled after voting
    await expect(helpfulButton).toBeDisabled();
  });

  test('should show mobile sticky cart on small screens', async ({ page }) => {
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Sticky cart should be visible
    await expect(page.locator('[data-testid="sticky-mobile-cart"]')).toBeVisible();
    
    // Should show selected variant and price
    await expect(page.locator('[data-testid="sticky-mobile-cart"]')).toContainText('10 lb');
    await expect(page.locator('[data-testid="sticky-mobile-cart"]')).toContainText('$59.99');
  });

  test('should download spec sheet', async ({ page }) => {
    // Navigate to product details section
    await page.locator('#details').scrollIntoViewIfNeeded();
    
    // Set up download handler
    const downloadPromise = page.waitForEvent('download');
    
    // Click download button
    await page.getByRole('button', { name: 'Download Spec Sheet' }).click();
    
    // Wait for download
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('.pdf');
  });

  test('should copy mix composition to clipboard', async ({ page }) => {
    // Navigate to mix section
    await page.locator('#mix').scrollIntoViewIfNeeded();
    
    // Click copy mix button
    await page.getByRole('button', { name: 'Copy Mix' }).click();
    
    // Should show success state
    await expect(page.getByText('Copied!')).toBeVisible();
  });
});
