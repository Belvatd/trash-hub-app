import * as admin from "firebase-admin"

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "app-trash-hub",
      clientEmail: "firebase-adminsdk-7y29z@app-trash-hub.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCm62kP7/5CimZw\nHoLMI+uzoGRLQ1BzXmRShAAxOHI1mieRe96XacJI8OhPAVmdp+Dq+v4e5KuUTRsm\ndnXZVjpQKB2OPlvHmOyra9MdVo9evOnQ8Qim2mY9/2+TgksnH/aS3EjuQTZucnV2\no3aKW59+ZWEODyk5hJYo3Zcc1BW2WFEtZ1Rrv1aMH6nfvvFzr2mBrQ+QGxhAbUIf\nj+1XW9VH3sWWcrrPkvTxKbsGSXHaCXnKKt0UldSkOWfmZM7nrbQXUb2X3BeYC1gS\nRVNTazgPsFFIX5Ee3ulfKg99Vjr8NT1JVEHHCDF99Y3gUimbSbL9vp2c4iutkKFX\nw8aFf6iRAgMBAAECggEAC9HORg33x9JxCoNpPkyqMLVXehTcKi8xlL46x+wipN+z\nlD5cjAWLImByCBYlDbWI3FrFin56v9eYkpKqKaeiHXGZwNbIPPamhkTuVWd/DiBR\nFjXbJ6V+E+nLMXt1GDd6iE+yQly6c/uwNvnAN8U2eAbJu+sgP4MUoZ7UnSVPcZ1A\ntJzmPAqIE9Y/xSFGPRt7DSvP99r/VX2iW+1hSaM+VvERAYf+TRzaCskzXRJ3VbwP\nmzXph9u5wzUPNlG3aHhtNyE+Y5hf1iNSaL6+wd72Pi1dpSNH0T7pWgnr73VtXGW8\nzkPJLebjR1UIpFAWg+s+nfvTy3cg3n/cyj1D6x4WoQKBgQDbAJQyBhrtsI8xO/oi\n1ToWK8xqUG3N7/b+lGjHHnI5NI/e/PZGVMquHG1ltwpDVJOI0KOxVTtuamsEYoL7\nK/NWgT06bYYUGZQ8bJdO39fV3I8kEtZMz7Q8TyYqY/qOpsReiVT4l7coEyXf9Ffd\n4zZDlrjP5AF/rIYqV82bMZg2VQKBgQDDHltOn7Tg/FBkTMWdPnzRsyGj1TFmFxxt\ndLvXr3ykhhVGcUVyZVoH9qYAc5dZUWHJlzb1JbS0w+302krD1ev+gdPsQzptDPJH\nTAdpS4FIimJ24Y/CpMdPahVwS3uMwKgm8RkF8Cr7UdwTDlLFTRtZan3tY4rasZm2\nB2MqYyENTQKBgFjB/k3b3ZQRp6cbmL//TSBpNdqsqCP7qk35VhHFTCPVIq4MNb/B\nY7d2+/tqWLV7FKQxcvZPBdw1MxQ+3LjxUhjwHiGM+/cver2WgShNXktlrXnATKwq\nzfBXX690f7rK6fEqlY5+5pNOV15RyD68dGSmNFbFILpe8K0+kqzgR8FVAoGAXdGC\n5dM1DdlEbnXbrzgUnGAdlME193i1Wov+pj7jF9jA8hYU5mSFXb7jIuRxqajP9DaZ\nXla7BRAQouMzf+akisOyOrA4r6bB+DY+egqsJ00i+zaKAXVpwG2p0Uz6Izufntne\nxlQs1psNzrvcYLIqrFvgIPz0DyPGXRhAPmlbwyECgYEAjUVB+y0OsFvA3JSThJfE\nAWxRKzxtyn8WDd+HJsoGeY9k+xf3BSBwcpyvKlzO8NHIo72srElzXHsXzmhoJ2F4\nAgHt3qavbBHIwyX/75hReBZh3JnmaZ3gThCreZlB7z+93BFQx0tHeftYkbJPPTkm\nOIuYhbCzj9jXaDCZQdMRvSU=\n-----END PRIVATE KEY-----\n",
    }),
  })
}

const authAdmin = admin.auth()

export { authAdmin }
