
# ScrewDrive (or screwdrive)

## What is it?

[ScrewDrive][note1] is web interface & API for a sensor data ecosystem under development. Name might change as the ecosystem features and development moves forward.

## What it consists of?

ScrewDrive uses several packages and technologies as its core.

Key technologies are JS (nodejs, expressjs & ES functionalities), MongoDB (cloud DB, via mongoosejs) and GraphQL (via Apollo-server-express).

As the ScrewDrive acts both as web interface & API, it will use JWT (json web token) for identifying client types and the privileges they have (mainly read / read+write). Only web interface and CLI has read+write privileges.

Additionally it uses dayjs to make timestamp handling easier and chalk to make console outputs prettier.

## ScrewDrive in-depth

With short description and tech stack revealed it might give you a glance to insides of ScrewDrive (or not, don't worry), but reading following will give you better insight what it actually does.

### Web interface

### (GraphQL) API

## Ecosystem?

- DriverBits - Mobile application
- ScrewDrive - Web & API (this project)
- ScrewDriver - CLI application to handle sensor data broadcasts (listen, send to API)

[note1]: ## "Not to be confused with _ScrewDriver_, see section 'Ecosystem?'"