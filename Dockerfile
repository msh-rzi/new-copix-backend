# Use the official Node.js image as a base
FROM node:20.12.0

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn run build

# create prisma types
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start:prod"]
