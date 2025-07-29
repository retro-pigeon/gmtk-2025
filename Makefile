SHELL := /bin/bash

BUILD_FOLDER = ./build/
SRC_FOLDER = ./src/
TEMP_FOLDER = ./temp/
CONTENT_FILE = ./build/content.json
CHECKSUM_FILE = ./build/checksum.sha256

# Reset folders
clean:
	mkdir -p $(BUILD_FOLDER)
	mkdir -p $(TEMP_FOLDER)
	rm -rf $(BUILD_FOLDER)/* $(BUILD_FOLDER)/.* $(TEMP_FOLDER)/*  $(TEMP_FOLDER)/.*

# Clean then build
build: clean $(BUILD_FOLDER)

# Create build folder and copy files
$(BUILD_FOLDER): checksum $(CONTENT_FILE)
	cp -r $(SRC_FOLDER)* $(BUILD_FOLDER)

# Create content.json file with file lists
$(CONTENT_FILE):
	@echo "{" > $(CONTENT_FILE)
	@for dir in js png glb wav text; do \
		echo -n "  \"$$dir\": [" >> $(CONTENT_FILE); \
		find $(SRC_FOLDER)$$dir -type f -printf "\"%f\", " | sed 's/, $$//' >> $(CONTENT_FILE); \
		echo "]," >> $(CONTENT_FILE); \
	done
	@sed -i '$$s/],/]/' $(CONTENT_FILE)
	@echo "}" >> $(CONTENT_FILE)

# Hash the hashes of all files in the source folder
checksum:
	find $(SRC_FOLDER) -type f -exec sha256sum {} \; | sort | sha256sum

# Prevents the Makefile from building files that don't exist
.PHONY: clean build