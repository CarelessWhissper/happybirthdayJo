"use client";

import { useState } from "react";
import { Form, Input, Button, Alert, FormProps } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";


interface LoginFormValues {
  email: string;
  password: string;
}


export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (res.ok) {
        dispatch(
          loginSuccess({
            token: result.token,
            email: values.email,
            role: "artist",
          })
        );
        router.push("/admin/dashboard");
      } else {
        dispatch(loginFailure(result.error));
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Admin Login</Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        <StyledForm layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
}
// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
`;


const StyledForm = styled(Form)<FormProps<LoginFormValues>>`
  .ant-form-item {
    margin-bottom: 16px;
  }
`;
