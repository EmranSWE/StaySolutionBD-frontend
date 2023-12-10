"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CustomLoading from "@/components/ui/CustomLoading";
import SSBreadCrumb from "@/components/ui/SSBreadCrumb";
import { issueStatus, priorityLevel } from "@/constants/global";
import { useAddIssueMutation } from "@/redux/api/issueApi";
import { useSingleRenterPropertyQuery } from "@/redux/api/propertyApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Divider, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddIssuePage = () => {
  const router = useRouter();
  const [addIssue] = useAddIssueMutation();
  // const { data } = useMyFlatQuery({});
  const { id } = getUserInfo() as { id: String };
  if (!id) {
    console.error("Id not found");
  }
  const { data, isLoading, isError, error } = useSingleRenterPropertyQuery(id);
  if (isLoading) {
    return <CustomLoading />;
  }
  const property = data[0]?.id;

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
      const res = await addIssue(values);
      if (!res) {
        message.error("Your issue doesn't added");
      }
      console.log(res);
      message.success("Reviews created successfully!");
      router.push("/renter/issues");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <SSBreadCrumb
        items={[
          {
            label: "renter",
            link: "/renter",
          },
          {
            label: "issue",
            link: "/renter/my-issue/",
          },
        ]}
      />
      <Divider orientation="center">
        <h1>
          Create <span style={{ color: "#1890ff" }}>Issues</span>
        </h1>
      </Divider>

      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Issues Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="issueDescription"
                  label="Issue Description"
                  rows={4}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="issueStatus"
                  options={issueStatus}
                  label="Issue"
                  placeholder="Select status"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="priorityLevel"
                  options={priorityLevel}
                  label="Priority Level"
                  placeholder="Select Priority Level"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  name="propertyId"
                  type="text"
                  value={property}
                  disabled
                  size="large"
                  label="Id"
                />
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Add Review
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddIssuePage;
