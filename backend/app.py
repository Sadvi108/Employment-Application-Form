from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MySQL database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Amarnamsadvi%40108@127.0.0.1/employment_applications'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    dateOfBirth = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    maritalStatus = db.Column(db.String(20))
    currentAddress = db.Column(db.Text, nullable=False)
    permanentAddress = db.Column(db.Text)
    phoneNumber = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    identificationNumber = db.Column(db.String(50), nullable=False)
    jobTitle = db.Column(db.String(100), nullable=False)
    expectedSalary = db.Column(db.String(50))
    availability = db.Column(db.String(50), nullable=False)
    preferredLocation = db.Column(db.String(100))
    highestQualification = db.Column(db.String(50), nullable=False)
    institution = db.Column(db.String(100), nullable=False)
    fieldOfStudy = db.Column(db.String(100), nullable=False)
    graduationYear = db.Column(db.String(10), nullable=False)
    certifications = db.Column(db.Text)
    companyName = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(100), nullable=False)
    responsibilities = db.Column(db.Text, nullable=False)
    reasonForLeaving = db.Column(db.String(200))

@app.route('/api/submit-application', methods=['POST'])
def submit_application():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        application = Application(
            fullName=data.get('fullName'),
            dateOfBirth=data.get('dateOfBirth'),
            gender=data.get('gender'),
            nationality=data.get('nationality'),
            maritalStatus=data.get('maritalStatus'),
            currentAddress=data.get('currentAddress'),
            permanentAddress=data.get('permanentAddress'),
            phoneNumber=data.get('phoneNumber'),
            email=data.get('email'),
            identificationNumber=data.get('identificationNumber'),
            jobTitle=data.get('jobTitle'),
            expectedSalary=data.get('expectedSalary'),
            availability=data.get('availability'),
            preferredLocation=data.get('preferredLocation'),
            highestQualification=data.get('highestQualification'),
            institution=data.get('institution'),
            fieldOfStudy=data.get('fieldOfStudy'),
            graduationYear=data.get('graduationYear'),
            certifications=data.get('certifications'),
            companyName=data.get('companyName'),
            position=data.get('position'),
            duration=data.get('duration'),
            responsibilities=data.get('responsibilities'),
            reasonForLeaving=data.get('reasonForLeaving')
        )
        db.session.add(application)
        db.session.commit()
        return jsonify({'message': 'Application submitted successfully', 'id': application.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/applications', methods=['GET'])
def get_applications():
    try:
        applications = Application.query.all()
        result = []
        for app in applications:
            result.append({
                'id': app.id,
                'fullName': app.fullName,
                'dateOfBirth': app.dateOfBirth,
                'gender': app.gender,
                'nationality': app.nationality,
                'maritalStatus': app.maritalStatus,
                'currentAddress': app.currentAddress,
                'permanentAddress': app.permanentAddress,
                'phoneNumber': app.phoneNumber,
                'email': app.email,
                'identificationNumber': app.identificationNumber,
                'jobTitle': app.jobTitle,
                'expectedSalary': app.expectedSalary,
                'availability': app.availability,
                'preferredLocation': app.preferredLocation,
                'highestQualification': app.highestQualification,
                'institution': app.institution,
                'fieldOfStudy': app.fieldOfStudy,
                'graduationYear': app.graduationYear,
                'certifications': app.certifications,
                'companyName': app.companyName,
                'position': app.position,
                'duration': app.duration,
                'responsibilities': app.responsibilities,
                'reasonForLeaving': app.reasonForLeaving
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    app.run(debug=True, port=5000)
