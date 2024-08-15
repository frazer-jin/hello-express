const { JWE, JWS, JWK } = require('node-jose');


const public_key = `
-----BEGIN CERTIFICATE-----
MIIC4jCCAcoCCQC+0wx8btyDUzANBgkqhkiG9w0BAQUFADAzMQswCQYDVQQGEwJD
TjERMA8GA1UECAwIWmhlSmlhbmcxETAPBgNVBAcMCEhhbmdaaG91MB4XDTIyMDIy
NDA2MDY0NFoXDTIyMDIyNTA2MDY0NFowMzELMAkGA1UEBhMCQ04xETAPBgNVBAgM
CFpoZUppYW5nMREwDwYDVQQHDAhIYW5nWmhvdTCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBALnqnJn6jEcRjA6TADpMu+BwaEBi8LFNaoX3wVd3omdSJt9a
tPDQLD1PmFzBzoGKFk941YyP2kr7SMceiOC/0e8Kq/DGSU9HVsLOPdaWpcQPNgvJ
l4FpHs9xbMJ8pQa1YOjo0VavDYxQ3n5MMzW3bCrI9H+5wySdqhPvmbsTs+iQJQjC
6loVjlkqRehlRXFX7Gdie+o8L8fk3Oqt/AChfWCdBNJ1C0SurACDHiqR5EKnBggK
7jif2zLZ9VZQltdA9430dGrR441FssK6hAjTHh8rulg76o+rzGLiDYBx7D5QuCRD
TDZyQzJgNmWdonicCnQwoD/da4bbJUXq6OgGdb8CAwEAATANBgkqhkiG9w0BAQUF
AAOCAQEAThpQtQBd0Vc6uullDf65hRtpeKh62NzZoFBS3mSm6DM2Hgt++8nOZJfn
hjzl0snxrTvokNA3ek7hyra8qmw5ooAmN90vLsokc1M60LoXl2/OpJqv55an7HUF
QdbaMQrtt1MZSaR6rI5GUGy1mAd9j/h2at/9g9TavCl4cSwaazjg33+uU4mWva4X
BJEVxYElIRzgYW5zWK66ZP5l5LrBkdk2A29ThEoMPVbxmb1U2S/AQJNsLZPm3SzL
U25rpDbBDjseI/7tBiuWfNnOCRtP3IahE/I8xRok4WbRO+bQ2nM9ukAsyfHD9CXT
S03o2vT9xR7pi3V17NXdHFkNY/BlMw==
-----END CERTIFICATE-----
`;

const wrong_public_key = `
-----BEGIN CERTIFICATE-----
MIIDAzCCAesCFEV1GVB+fr/SzQMOkT8RiwqCvJHuMA0GCSqGSIb3DQEBCwUAMD4x
CzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTERMA8GA1UEBwwIU2FuIEpvc2UxDzAN
BgNVBAoMBkNpdGNvbjAeFw0yNDA0MDMwMzU5NDdaFw0zNDA0MDEwMzU5NDdaMD4x
CzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTERMA8GA1UEBwwIU2FuIEpvc2UxDzAN
BgNVBAoMBkNpdGNvbjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALP1
3wiSwzkkKy5u/RmEBy7WYmBISZ0MBKDgLNCDiFaRrBT+d8GjPCAV0OTEm3YdTXGG
wViiEq+sjaV0iA4l9RYKTv96XOP6ep8YgO1ihVUwRHFE1JvFjhxAZQ/31ofYYw+i
9Utva/TJY2fr41/s1I1b4wzUKeeu14JyYxb1wev9y4s0QHu+bgJjrc2mDviAky2F
FA92iPpG+Gc8VXI1uxSWGCOiAhgVYuLp4zcd47EIo+7KcUX3sVavEGEpOmA85JQZ
979vQ+T72yM5dZcMxSoSVk2h4NaL96Ipkg4pCwAmYNlxh0KdRkTsU69UiWPcWwKt
cDUvKh7OcqwEvDmoQ2cCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAQEM96NJLDfi1
xs6o/Yti/0AyILYFlfAxXGkw5T20SGL4JDUfEoWdBnCsMuHx+ZXFVeBvmctFV1V9
S2ISlP0a+pob+oYuwmZ4SFBsH5k1kmrchdOM3x5OX9qJjsLPuAf/FmFGRA7BHX0X
in50DEaJdO3GIvV8xCNeARKpL2Qx5JdNZ7jKg2B+76YWLZOSGq2ETTYH8HJkvrwc
xEy2/GO+ix6uzl6aFf0YUbzsFIbkL7nE9qCpW6mmAZJLLyVGIDx2NDUj+UOLZQFN
gY4j+z1cyBo1j+46BhcK6ggxQJ2js+gdr7IxXEEMIuj+BK71ODYXi4XFOrYW7jS7
UohdpYW9Ng==
-----END CERTIFICATE-----
`;

const private_key = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAueqcmfqMRxGMDpMAOky74HBoQGLwsU1qhffBV3eiZ1Im31q0
8NAsPU+YXMHOgYoWT3jVjI/aSvtIxx6I4L/R7wqr8MZJT0dWws491palxA82C8mX
gWkez3FswnylBrVg6OjRVq8NjFDefkwzNbdsKsj0f7nDJJ2qE++ZuxOz6JAlCMLq
WhWOWSpF6GVFcVfsZ2J76jwvx+Tc6q38AKF9YJ0E0nULRK6sAIMeKpHkQqcGCAru
OJ/bMtn1VlCW10D3jfR0atHjjUWywrqECNMeHyu6WDvqj6vMYuINgHHsPlC4JENM
NnJDMmA2ZZ2ieJwKdDCgP91rhtslRero6AZ1vwIDAQABAoIBAQCHvSSTQ5uxs70H
Uwqihi3R4yAqilJjkTtKDqbp3p4DQ7a/8nETNVpndTqv1oyYhaJeacG4u7rMbgUn
5EJZnZOALNF2nL8fk91jo8MAbsMej2CNYKUuRfrJyG143hp6+GiGBJ365RpGLTEV
Ezt8Z6wg3NGug4lXrYlkvtYGAY+kJoIYVTy1b7tjWQpHs14DkPbM1PUOr2Yq4htP
gklhGkuCmeR4kPDlWkEJZQ74tCjiWWsE2AxJVdJmE4uvS+UqGwCH2kt90lD/KjxZ
UtC1CdR2g8Pti91Qsd+98omDwtoBR/rT26EYFTBYzCe+7IBpuBwBkNrulzzZFxuI
Zfyq6aHRAoGBAO6vybawB7nnADIWyhMqBcdvE+R2A4MqdZdph44ADrZYLvglLgI0
+W5hmlJGliakeaiA/yfpZ50GnXgurcxB09tBWUi1dNgAG2Vk4Nqigzl/lvxuUZpj
K/gaIvWyv7FwJl1X038PLTuR3/BJq3D+ByI2ZzEA+2Fwfl/OSudM2kV5AoGBAMdm
7MXtxieXqU/I6KQ8yVl2JOda8dw8Oz14eWwKwEheTECMsriVJqVjmNCcVVC6hq8y
RbSdSekYVCCPdUUJypiNXu0Rb3o3jPj4WfVfbcw8R9+pMKsn3XXKX8RCU+xyNPgE
9XGBslTTFY0dufH4oPUNJ5QnbqqGvMry0KvHg173AoGAH/3Pu3y8jF452HzVeNwZ
CjIJKIXo0pvORw0N7ipzzlzjbr8M+56+D91lIcH0PhmtdLhVerP9/z3zvTgEc2wf
STPpE6W+k3TwNxbeTG+bxwki45KlvVuteQOHzAa5Sr8NZVVwM4eFOIbEzSASqoJh
0mQYUKkhCF5bkdvEjlvupYECgYBN6iHKlUZAYjp+Onrs8fObSVbSL+8hp0delZyc
YvcPUAlrj46mIWGgbnJf0TZk/P1zp6klEfC3bBIzRtsDxveq9FKLP6zXjK1A+4nr
HwbALy3Gb03dEw6t4A3bmi9AzL91yjo9x/fuvSxGn77wlb4PArzcXywW5d8PTiHL
fYIPsQKBgQDW9CZsR71nvGPNkOBLjvSXJ2H63gp+qZyQdHs1O0uXxJLo9W4o5M68
ag0xDZFpvvFDTk9evgkTxLmdX01zcQCFT3wj503q8m/kjbQDc0OMRyEjaCeLxQkg
EEwG7NGJ/WxRji6RwCzrpQG4z4qVzwwtQ6Fh8kzBqtcEMPKO1IaqFA==
-----END RSA PRIVATE KEY-----
`;

const wrong_private_key = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgSl6UXULrsR/1
o4WxXgFIlm1dbPBiG2vmI9l7AmmmNVFPNOjaBQ3Nigcby+L55wh4BjprfTHG3/df
baPDBT1Ib+Teo1E4a8I3P7AwIWnFTDcpFF5Johuygl2v+8DmmeFD3c3SGpxsRaTP
d58DEpliZDu9lFZS0VBvqd8bONHhSsU4hI0WAEedJ79kWEPdmBIT3PNQ1jdiZoyL
FMmDgdeIBzu/xdzRi/CYNByUmqrCDxTr6mKTTxQa8JS8REnalx9fqRIWleVZMz0d
U1RzJXXUy9A6NMpz3dN0L1tyfMjAxLyWMSqGcrt/Jh114F7a6Uo+ebvBugNOdlLq
adTyX5kPAgMBAAECggEAExPG3fGbnWGfZCTqLIn7rR/6NDxa/9IzrVhm8fT/jgCa
hMrPS+N+GRBseCp0ATo2D9Lt8Q0dd4YAcyMhcnyVJqHqo3TcndJ1cw3pclEHvaus
hP8fmbPph/1sGR3lf4yg+urTLEZuh5RiYS7jhgIYr1UupwmYnJK8+A1HuH2yvRVw
0ySuB0o3Tg57xan1Qs3B7Mx7S4ilMltZwNeGgv/qmHzh/fzz2mCugTzn3ILaRYMX
GinKk6Iv5qAcGfLeJMrKhAss++oh/xg84szSSGd3T3tLZ0RsAO1tjenSL9n75KWT
ZHjYShe6Ehou+uuwc+Rdm9bl9J/W2A3yWFptaVA6QQKBgQDSL/ZnsPfZ7OXkkWdG
Z3o6Kj+HTftBKBukj+BMGwv2JI3Ld5WuNll6B1xUBBMGeXrY5k74afghh+wqwUSo
VRez+aHCHsZcgzj8YLEVGNmfHiCGQijCHN30LGugw45y1UlQvmaKaOsVzLzZPmZk
YLwqOqwyqnC7dExBRbYuosAjrQKBgQDDOkMDp/qPBnNrXFY+a8cKxB7c6chLuZ5E
RCfoc4otQZ7nZFE0Z5XyK6TPWECG3UbjoMDOSG2stKAGZq8FTpdV6BLU2vUmVYKn
0yiDcqhFSZ6XV10OunbdEfWc9WyBjOkr+P+B0vYM0xeS0YOVJCjf8UaExjnwKMa9
rbwgBJtnKwKBgEcNI5SFxCMM6+HKLUklbbH/2h3ZBJhQAJgucroHYpHAZZZkRFrx
0Glp15InFm9X3Wk44XUkDVb4ZaNGVfk5WpviRQYj9RYM3dSisvnYvqgFPSVlc/W6
YGVMJs3fjWXQJ8p9spgTQ3TJEwW1DFPeR31W/CLcbuNPOv/NmvpE1gK5AoGBAI5j
VPM6teVRCCd6rjBSvVZd2kC3he2tEQCrUQwaEOKXJMWRhiSZlGSPbmIH9PAoPYbR
/S2257758mkYxXgybPAsFmgG1pxB68xplvfgTVhTrIanImkWmJD+g0waOCx40KvQ
rNJMQkbyQxRDGRxSxjknKY63YRSHOQSozTfxBEMHAoGAV1KqsbM5S5Pot6TpLkWq
a+jb8wfK6hkeVhJNBEkZvCMz1ZB9aaz3PIdcyYWFhFDZmaIHc4dx42eyT+0sMDft
UxfOmMiUv7XVoHTN/+OYIQ2HwO0XDAyKOqK+sZGLftu104tgW5gOKQ4ySb7zDsqD
oFN1Lj7HJNwufkKO8V0b2AU=
`;


async function getKey() {
    return JWK.createKey("oct", 256, {alg: 'HS256', kid: '123'});
    // generate on https://mkjwk.org/
    // return JWK.asKey({
    //     "kty": "oct",
    //     "use": "sig",
    //     "kid": "123",
    //     "k": "wNO06SHKVlajhqJc7JgWIRvY_TLBnsxP3qQFDDAatLWfJ6Ne9eu8NXtBtiN0l5bmZLBV8h4YDgT70acPYnDtIIHZFdeYiuo0rUPuxw6T3IcRguDFw7aQ_URbe2bLoqhunUiP9uxgsLD8osPeTix18N32peTa1-JrnmU9tlIG4p9tQ35jvTEtCFn_GzBAKV88nguwWVfWYw_3uhJSUqigugKa9N3HVSrvmt0Y4dVOHPJsxKVg5bBcpP4B2rITa0DZBqlQQPOuLoYIgM7lpm2iKJUYNDPNj83svvmnrmJEmL0FLGot4tQ9CTPakMuy4bSN0xyn1KCOEVtkSYy7J0_S_Q",
    //     "alg": "HS256"
    // });
}

async function getWrongKey() {
    return JWK.createKey("oct", 256, {alg: 'HS256', kid: '1234'});
}

async function getPrivateKey() {
    return JWK.asKey(private_key, 'pem');
}

async function getPublickKey() {
    return JWK.asKey(public_key, 'pem');
}

async function getWrongPublickKey() {
    return JWK.asKey(wrong_public_key, 'pem');
}

async function getWrongPrivateKey() {
    return JWK.asKey(wrong_private_key, 'pem'); 
}

async function createSign(key, input) {
    const data = await JWS.createSign({format: 'compact'}, key)
        .update(input)
        .final();
    return data;
}

async function verifySign(key, input) {
    const data = await JWS.createVerify(key)
        .verify(input);
    return data;
}

async function createEncrypt(key, input) {
    const data = await JWE.createEncrypt({format: 'compact'}, key)
    .update(input)
    .final();
    return data;
}

async function createDecrypt(key, input) {
    const data = await JWE.createDecrypt(key)
        .decrypt(input);
    return data;
}

const payload = {
    sub: 'user123',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000)
};

async function testSignSync() {
    const input = JSON.stringify(payload);
    console.log('input: ' + input);
    const key = await getKey();
    const data = await createSign(key, input);
    console.log(data);

    const data1 = await verifySign(key, data);
    console.log(data1.payload.toString());

    try {
        const wrongKey = await getWrongKey();
        const data2 = await verifySign(wrongKey, data);
        console.log(data2.payload.toString());
    } catch (error) {
        console.log('wrongKey verify error:', error);
    }
}


async function testSignAsync() {
    const input = JSON.stringify(payload);
    console.log('input: ' + input);
    const privateKey = await getPrivateKey();
    const data = await createSign(privateKey, input);
    console.log(data);

    const publicKey = await getPublickKey();
    const data1 = await verifySign(publicKey, data);
    console.log(data1.payload.toString());

    try {
        const wrongVerifyKey = await getWrongPublickKey();
        const data2 = await verifySign(wrongVerifyKey, data);
        console.log(data2.payload.toString());
    } catch (error) {
        console.log('wrongVerifyKey verify error:', error);
    }
}

async function testJWE() {
    const input = JSON.stringify(payload);
    console.log('input: ' + input);
    const publicKey = await getPublickKey();
    const data = await createEncrypt(publicKey, input);
    console.log(data)

    const privateKey = await getPrivateKey();
    const data1 = await createDecrypt(privateKey, data);
    console.log(data1.payload.toString());

    try {
        const wrongDecryptKey = await getWrongPrivateKey();
        const data2 = await createDecrypt(wrongDecryptKey, data);
        console.log(data2.payload.toString());
    } catch (error) {
        console.log('wrongDecryptKey decrypt error:', error);
    }
}


// testSignSync();
// testSignAsync();
// testJWE();

