"use server";

export async function makeRequest(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const username = formData.get("username");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log({ username, email, message });

  return { username, email, message };
}
