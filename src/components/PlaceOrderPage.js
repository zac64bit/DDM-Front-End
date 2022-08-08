import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Typography,
    List,
    message,
    Image
} from 'antd';
import { getCost } from "../utils";

const StaticMapUrl = `https://www.mapquestapi.com/staticmap/v5/map?start=New York, NY&end=Boston, MA&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`;
//const StaticMapUrl = `https://www.mapquestapi.com/staticmap/v5/map?start=${this.props.order.sending_address}&end=${this.props.order.receiving_address}&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`;
const { Title, Text } = Typography;

class Info extends React.Component {
    formRef = React.createRef();

    state = {
        loading: false,
    };

    handlePrevious = () => {
        this.setState({
            loading: true,
        });

        try {
            this.props.handlePrevious();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    handleNext = async () => {
        const formInstance = this.formRef.current;

        try {
            await formInstance.validateFields();
        } catch (error) {
            return;
        }

        this.setState({
            loading: true,
        });

        try {
            this.props.handleNext();
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    onFinish = () => {
        console.log('Finish form');
    };

    render() {
        return (
            <>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    ref={this.formRef}
                >
                    <Title level={3}>Enter Shipper Info</Title>

                    <Form.Item
                        label="First Name"
                        name="ShipperFirstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the first name!',
                            },
                        ]}
                    >
                        <Input placeholder="Please input shipper's first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="ShipperLastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the last name!',
                            },
                        ]}
                    >
                        <Input placeholder="Please input shipper's last name" />
                    </Form.Item>

                    <Title level={3}>Enter Recipient Info</Title>

                    <Form.Item
                        label="First Name"
                        name="RecipientFirstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the first name!',
                            },
                        ]}
                    >
                        <Input placeholder="Please input recipient's first name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="RecipientLastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the last name!',
                            },
                        ]}
                    >
                        <Input placeholder="Please input recipient's last name" />
                    </Form.Item>
                    <OrdSummary orderInfo={this.props.orderInfo} />
                </Form>
                <h1>
                    <Button
                        onClick={this.handlePrevious}
                        disabled={this.state.loading}
                        type="primary"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={this.handleNext}
                        disabled={this.state.loading}
                        type="primary"
                    >
                        Next
                    </Button>
                </h1>
            </>
        );
    };
};

class OrdSummary extends React.Component {
    state = {
        loading: false,
    };

    componentDidMount() {
        this.loadData();
    }

    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    loadData = async () => {
        this.setState({
            loading: true,
        });

        try {
            const resp = await getCost();
            this.setState({
                data: resp,
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Title level={3}>Order Summary</Title>
                    <Form>
                        <p>Delivery Fee: {this.props.orderInfo.cost.deliveryFee}$</p>
                        <p>Eximated Tax Collected: {this.props.orderInfo.cost.estimatedTax}$</p>
                        <p>Order Total: {this.props.orderInfo.cost.orderTotal}$</p>
                    </Form>
                </Form>
            </>
        )
    }
}

class RouteMap extends React.Component {
    // 暂略
    render() {
        return (
            <Image
                width={550}
                src={`https://www.mapquestapi.com/staticmap/v5/map?start=${this.props.orderInfo.sending_address}&end=${this.props.orderInfo.receiving_address}&size=@2x&key=xAGEknEZgp2cweVEAI9RGBYxwGU88prC`}
            />
        )
    }
}

class PlaceOrderPage extends React.Component {
    render() {
        return (
            <Row className='main'>
                <Col span={11} className="left-side">
                    <Info handlePrevious={this.props.handlePrevious} handleNext={this.props.handleNext} orderInfo={this.props.orderInfo} />
                </Col>
                <Col span={13} className="right-side">
                    <RouteMap orderInfo={this.props.orderInfo} />
                </Col>
            </Row>
        );
    }
}

export default PlaceOrderPage;