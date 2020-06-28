@app
begin-app

@static

@http
get /api/v1/users
@tables
data
  scopeID *String
  dataID **String
  ttl TTL
