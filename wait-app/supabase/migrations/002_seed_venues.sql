-- Optional: seed a few sample venues so the app shows something.
-- Run once after 001_venues_and_wait_reports.sql.

insert into public.venues (name, category, address, lat, lng, latest_wait_category, latest_wait_source, latest_wait_at)
values
  ('The Local Bistro', 'restaurants', '123 Main St', 37.7749, -122.4194, 'short', 'user', now() - interval '15 minutes'),
  ('Corner Coffee', 'coffee_shops', '456 Oak Ave', 37.7755, -122.4180, 'no_wait', 'venue', now() - interval '5 minutes'),
  ('Downtown Bar', 'bars', '789 Pine Rd', 37.7760, -122.4200, 'moderate', 'user', now() - interval '30 minutes'),
  ('FitLife Gym', 'gyms', '321 Elm St', 37.7730, -122.4210, 'long', 'venue', now() - interval '1 hour'),
  ('Style Salon', 'salons', '654 Birch Blvd', 37.7720, -122.4170, null, null, null),
  ('Quick Bites', 'restaurants', '111 First St', 37.7770, -122.4220, 'no_wait', 'google', now() - interval '45 minutes');
