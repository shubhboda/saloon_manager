UPDATE appointments SET service = REPLACE(service, 'dollar', 'rupiya') WHERE service LIKE '%dollar%';
