# CIM - Parcel Classification 

## Overview

This is a Web app I'm prototyping that helps us classify customers' plots of land into one of six bins.

	1. Not Visible on Map
	2. Residential
	3. Single Building, Single Business (SINGLE NONSUITE)
	4. Single Building, Multiple Businesses (SUITE)
	5. Multiple Buildings, Single Business (CAMPUS)
	6. Multiple Buildings, Multiple Businesses

## Inputs

I intend for this app to receive the following information from a database:

	* D-U-N-S Number
	* Address Line 1 & 2 (concatenated)
	* Address City and State (concatenated and comma-separated)
	* The XML/JSON response of a Parcel Boundary vendor's API (currently we have data from SpatialStream's free trial)

## Outputs

The classifier should append two variables to the input data.

	* Checked: whether or not this location was classified using the app
	* Classification: what bin this location falls into

## Version 1.0 Functionality

Right now, the app has 5 locations hard-coded into it and the ability to export the classification of those locations to a CSV.

## Goals for Version 1.1

	* I definitely want this app to have a proper backend. For the next version, something as simple as being able to read from a CSV would be great.
	


