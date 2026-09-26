# Swell Watch

A single-page surf forecast for Washington spots (Crescent Beach, Twin Rivers, Fort Ebey, Westport) that scores each daylight hour from four independent sources and checks the models against the buoys.

Everything runs in the browser. There is no server. Data comes live from Open-Meteo (NOAA GFS Wave and Météo-France MFWAM), NOAA CO-OPS tides, the NWS coastal waters forecast via api.weather.gov, and NDBC/CDIP buoys via the IOOS ERDDAP mirror.

## Session log

By default the log is kept in the browser. To share it between phone and laptop, set up the Google Sheet in `apps-script.gs` and paste the deployed URL into `SHEET_URL` at the top of `index.html`.
