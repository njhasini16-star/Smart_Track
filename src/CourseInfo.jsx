export default function CourseInfo(discipline) {
    class Course {
        static allCourses = [];
        constructor(code, name, credits, basket = null) {
            this.code = code;
            this.name = name;
            this.credits = credits;
            if (basket) {
                this.basket = basket;
            }
            Course.allCourses.push(this);
        }
    }
    
    const courses = {};
// Institute level Courses
    const ES101 = new Course("ES 101", "Engineering Graphics", 3);
    const ES112 = new Course("ES 112", "Computing", 3);
    const ES113 = new Course("ES 113", "Data Centric Computing", 3);
    const ES114 = new Course("ES 114", "Probability, Statistics and Data Visualization", 3);
    const ES115 = new Course("ES 115", "Design, Innovation and Prototyping", 5);
    const ES116 = new Course("ES 116", "Principles and Applications of Electrical Engineering", 5);
    const ES117 = new Course("ES 117", "The World of Engineering", 2);
    const ES243 = new Course("ES 243", "Biology for Engineers", 4);
    const BS192 = new Course("BS 192", "Undergraduate Science Laboratory", 3);
    
    courses["Institute level Courses"] = [ES101, ES112, ES113, ES114, ES115, ES116, ES117, ES243, BS192];
// AI
// Discipline Core Courses
    const CS203 = new Course("CS 203", "Software Tools & Techniques for AI", 4);
    const CS303 = new Course("CS 303", "Mathematical Foundations for AI", 4);
    const CS328 = new Course("CS 328", "Introduction to Data Science", 4);
    const CS329 = new Course("CS 329", "Foundations of AI: Multiagent Systems", 4);
    const CS201 = new Course("CS 201", "Theory of Computation", 4);
    const ES215 = new Course("ES 215", "Computer Organisation & Architecture", 4);
    const ES335 = new Course("ES 335", "Machine Learning", 4);
    const ES242 = new Course("ES 242", "Data Structures and Algorithms-1", 4);
    const ES204 = new Course("ES 204", "Digital Systems", 4);
    const SignalsSystems = new Course("TBD", "Signals, Systems & Random Processes", 4);
    const ControlSystems = new Course("TBD", "Control Systems", 4);

// Discipline Electives
    const CS333 = new Course("CS 333", "Ethics of AI", 4);
    const CS613 = new Course("CS 613", "Natural Language Processing", 4);
    const ES615 = new Course("ES 615", "Nature Inspired Computing", 4);
    const ES645 = new Course("ES 645", "Optimization Methods in Machine Learning", 4);
    const ES659 = new Course("ES 659", "Computer Graphics", 4);
    const ES661 = new Course("ES 661", "Probabilistic Machine Learning", 4);
    const ES666 = new Course("ES 666", "Computer Vision", 4);
    const ES667 = new Course("ES 667", "Deep Learning", 4);
    const ES670 = new Course("ES 670", "Matrix Methods for Signal Processing, Data Science, and Machine Learning", 4);
    const ES676 = new Course("ES 676", "Classical Information Theory", 4);
    const ME639 = new Course("ME 639", "Introduction to Robotics", 4);
    const ReinforcementLearning = new Course("TBD", "Reinforcement Learning", 4);
    const GameTheory = new Course("TBD", "Game Theory", 4);
    const KnowledgeRepresentation = new Course("TBD", "Knowledge Representation and Reasoning", 4);
    const SpeechTechnology = new Course("TBD", "Speech Technology", 4);
    const AISustainability = new Course("TBD", "AI for Sustainability", 4);
    const AIEarthSciences = new Course("TBD", "AI for Earth Sciences", 4);
    const AIBiologicalEngg = new Course("TBD", "AI for Biological Engineering", 4);

    
    // CSE Basket
    const CS301 = new Course("CS 301", "Operating Systems", 4, "CSE Basket");
    const CS327 = new Course("CS 327", "Compilers", 5, "CSE Basket");
    const CS432 = new Course("CS 432", "Databases", 4, "CSE Basket");
    const CS433 = new Course("CS 433", "Computer Networks", 4, "CSE Basket");
    const CS436 = new Course("CS 436", "History of Computing and its Applications to Domains", 4, "CSE Basket");
    const EE323 = new Course("EE 323", "Digital Signal Processing", 4, "CSE Basket");
    const ES214 = new Course("ES 214", "Discrete Mathematics", 4, "CSE Basket");
    const ES669 = new Course("ES 669", "Advanced Computer Architecture and Systems", 4, "CSE Basket");
    const SoftwareEngineering = new Course("TBD", "Software Engineering", 4, "CSE Basket");


    if (discipline === "AI") {
        courses["Discipline Core Courses"] = [CS203, CS303, CS328, CS329, CS201, ES215, ES335, ES242, ES204, SignalsSystems, ControlSystems]
        courses["Discipline Electives"] = [
        CS333, CS613, ES615, ES645, ES659,
        ES661, ES666, ES667, ES670, ES676,
        ME639, ReinforcementLearning, GameTheory,
        KnowledgeRepresentation, SpeechTechnology,
        AISustainability, AIEarthSciences, AIBiologicalEngg,
        CS301, CS327, CS432, CS433, CS436,
        EE323, ES214, ES669, SoftwareEngineering]
    }
// CL
// Discipline Core Courses
const ES211 = new Course("ES 211", "Thermodynamics", 3);
const CL202 = new Course("CL 202", "Chemical Engineering Thermodynamics", 3);
const CL201 = new Course("CL 201", "Chemical Process Calculations", 3);
const CL203 = new Course("CL 203", "Process Fluid Mechanics", 3);
const CL204 = new Course("CL 204", "Heat Transfer", 3);
const CL205 = new Course("CL 205", "Chemical Reaction Engineering - I", 3);
const CL313 = new Course("CL 313", "Chemical Reaction Engineering - II", 3);
const CL314 = new Course("CL 314", "Separation Processes - I", 3);
const CL315 = new Course("CL 315", "Process Dynamics and Control", 3);
const CL316 = new Course("CL 316", "Separation Processes - II", 3);
const CL317 = new Course("CL 317", "Process Synthesis, Design, and Simulation", 4);
const CL325 = new Course("CL 325", "Transport Phenomena", 3);
const CL326 = new Course("CL 326", "Integrated Chemical Engineering Lab-I", 3);
const CL327 = new Course("CL 327", "Integrated Chemical Engineering Lab-II", 3);

// Discipline Electives
const BS401 = new Course("BS 401", "Nanoscale Science", 4);
const CL324 = new Course("CL 324", "Introduction to Polymer Science and Engineering", 4);
const CL353 = new Course("CL 353", "Introduction to Process Safety", 2);
const CL426 = new Course("CL 426", "Biochemical Engineering", 4);
const CL427 = new Course("CL 427", "Formulation Science and Engineering", 4);
const ES604 = new Course("ES 604", "Engineering Optimization", 4);
const ES617 = new Course("ES 617", "Design of Experiments", 4);
const ES658 = new Course("ES 658", "Molecular Simulations - Theory and Applications", 4);
const ES662 = new Course("ES 662", "Flexible Electronics: Materials, Methods and Devices", 4);
const ES664 = new Course("ES 664", "Scientific Computing using C++", 4);
const CL601 = new Course("CL 601", "Advance Transport Phenomena", 4);
const CL602 = new Course("CL 602", "Advanced Thermodynamics", 4);
const CL604 = new Course("CL 604", "Advanced Reaction Engineering", 4);
const CL605 = new Course("CL 605", "Colloidal Domain: Where Science Meets Engineering", 4);
const CL627 = new Course("CL 627", "Particulate Solids: Processing & Surface Engineering", 4);
const CL628 = new Course("CL 628", "Liquid State Theory", 4);
const CL629 = new Course("CL 629", "Fundamentals of Aerosol Science", 4);
const CL630 = new Course("CL 630", "Catalyst Design for Heterogeneous Reactions", 4);
const CE634 = new Course("CE 634", "Air Pollution Control Engineering", 4);

    if (discipline === "CL") {
        courses["Discipline Core Courses"] = [ES211, CL202, CL201, CL203, CL204,
        CL205, CL313, CL314, CL315, CL316,
        CL317, CL325, CL326, CL327];
        courses["Discipline Electives"] = [BS401, CL324, CL353, CL426, CL427,
        ES604, ES617, ES658, ES662, ES664,
        CL601, CL602, CL604, CL605, CL627,
        CL628, CL629, CL630, CE634];
    }
// CE
// Discipline Core Courses

const ES221 = new Course("ES 221", "Mechanics of Solids", 4);
const CE201 = new Course("CE 201", "Earth Materials and Processes", 2);
const CE303 = new Course("CE 303", "Geospatial Engineering", 2);
const CE302 = new Course("CE 302", "Structural Analysis", 4);
const ES212 = new Course("ES 212", "Fluid Mechanics", 4);
const CE202 = new Course("CE 202", "Sustainability and Environment", 3);
const CE310 = new Course("CE 310", "Hydrology and Hydraulics", 4);
const CE312 = new Course("CE 312", "Design of Steel Structures", 4);
const CE301 = new Course("CE 301", "Soil Mechanics", 5);
const CE311 = new Course("CE 311", "Design of Reinforced Concrete Structures", 5);
const CE403 = new Course("CE 403", "Construction Technology & Management", 4);

// Discipline Electives

const CE313 = new Course("CE 313", "Environmental Science and Engineering", 4, "Design/Applications Basket");
const CE314 = new Course("CE 314", "Geotechnical Engineering", 4, "Design/Applications Basket");
const CE404 = new Course("CE 404", "Transportation Engineering", 4, "Design/Applications Basket");
const IrrigationStructures = new Course("TBD", "Irrigation Engineering and Hydraulic Structures", "TBD", "Design/Applications Basket");

const CE307 = new Course("CE 307", "Masonry Design", 2);
const CE603 = new Course("CE 603", "Constitutive Models in Soil Mechanics", 4);
const CE605 = new Course("CE 605", "Remote Sensing of Land and Water Resources", 4);
const CE607 = new Course("CE 607", "Advanced Structural Analysis", 4);
const CE611 = new Course("CE 611", "Advanced Engineering Hydrology", 4);
const CE613 = new Course("CE 613", "Analysis and Design of Masonry Buildings", 4);
const CE615 = new Course("CE 615", "Structural Design for Fire", 4);
const CE622 = new Course("CE 622", "Structural Dynamics", 4);
const CE624 = new Course("CE 624", "River Engineering", 4);
const CE625 = new Course("CE 625", "Advanced Hydraulic Engineering", 4);

const CE626 = new Course("CE 626", "Earthquake Engineering", 4);
const CE627 = new Course("CE 627", "Slopes and Retaining Structures", 2);
const CE628 = new Course("CE 628", "Applied Hydraulic Transients", 4);
const CE629 = new Course("CE 629", "Geosynthetics", 4);
const CE631 = new Course("CE 631", "Irrigation Engineering and Hydraulic Structures", 4);
const CE632 = new Course("CE 632", "Advanced Concrete Design", 4);
// const CE634 = new Course("CE 634", "Air Pollution Control Engineering", 4);
const CE635 = new Course("CE 635", "Pavement Materials and Design", 4);
const CE636 = new Course("CE 636", "Traffic and Roadway Engineering", 4);
const ES404 = new Course("ES 404", "Networks and Complex Systems", 4);
const CE638 = new Course("CE 638", "Advanced Concrete Technology", 4);
const CESpecialTopics = new Course("CE 691-XX", "Special Topics in Civil Engineering", "TBD");
// const CL629 = new Course("CL 629", "Fundamentals of Aerosol Science", 4);
const EH610 = new Course("EH 610", "Engineering Seismology and Seismic Hazard", 4);

const ES607 = new Course("ES 607", "Foundations of Fluid Dynamics", 4);
const ES621 = new Course("ES 621", "Advanced Solid Mechanics", 4);
const ES622 = new Course("ES 622", "Finite Element Methods", 4);
const ES624 = new Course("ES 624", "Non-Linear Elasticity", 4);
const ES635 = new Course("ES 635", "Water Quality Engineering", 4);
const ES646 = new Course("ES 646", "Elastodynamics and Vibrations", 4);
const ES648 = new Course("ES 648", "Nonlinear Dynamics and Vibrations", 4);
const ES651 = new Course("ES 651", "Computational Inelasticity", 4);
const ES652 = new Course("ES 652", "Contaminant Transport and Remediation", 4);
const ES653 = new Course("ES 653", "Nonlinear Continuum Mechanics", 4);
const ES660 = new Course("ES 660", "Variational Methods in Mechanics", 4);
const ES671 = new Course("ES 671", "Mechanics of Composite Materials", 4);
const ME605 = new Course("ME 605", "Computational Fluid Dynamics", 4);
const ME628 = new Course("ME 628", "Advanced Fluid Mechanics", 4);
const ME640 = new Course("ME 640", "Fracture Mechanics", 4);

const EarthSystemsDS = new Course("TBD", "Data Sciences for Earth Systems", "TBD");
const AdvanceDesign = new Course("TBD", "Advance Design of (Steel/Concrete)", "TBD");
const AdvanceTransport = new Course("TBD", "Advance Courses in Transportation Engineering", "TBD");

    if (discipline === "CE") {
        courses["Discipline Core Courses"] = [ES221, CE201, CE303, CE302, ES212,
        CE202, CE310, CE312, CE301, CE311, CE403];

        courses["Discipline Electives"] = [CE313, CE314, CE404, IrrigationStructures,
    CE307, CE603, CE605, CE607, CE611, CE613,
    CE615, CE622, CE624, CE625,
    CE626, CE627, CE628, CE629, CE631, CE632,
    CE634, CE635, CE636, CE637, CE638,
    CESpecialTopics, CL629, EH610,
    ES404, ES607, ES621, ES622, ES624,
    ES635, ES646, ES648, ES651, ES652,
    ES653, ES660, ES671,
    ME605, ME628, ME640,
    EarthSystemsDS, AdvanceDesign, AdvanceTransport]

    }

// CSE
// Discipline Core Courses

// const ES242 = new Course("ES 242", "Data Structures and Algorithms I", 4);
// const ES214 = new Course("ES 214", "Discrete Mathematics", 4);
// const ES204 = new Course("ES 204", "Digital Systems", 4);
// const ES215 = new Course("ES 215", "Computer Organization & Architecture", 4);
// const CS201 = new Course("CS 201", "Theory of Computing", 4);
// const CS301 = new Course("CS 301", "Operating Systems", 4);
const CS202 = new Course("CS 202", "Software Tools and Techniques for CSE", 4);
// const CS329 = new Course("CS 329", "Foundations of AI: Multiagent Systems", 4);
const CS331 = new Course("CS 331", "Computer Networks", 4);

// Discipline Electives

// const ES335 = new Course("ES 335", "Machine Learning", 4);
// const ES404 = new Course("ES 404", "Networks and Complex Systems", 4);
// const ES615 = new Course("ES 615", "Nature Inspired Computing", 4);
const ES627 = new Course("ES 627", "Linear Algebra and Computation", 4);
const ES637 = new Course("ES 637", "Mathematical Foundations for Computer Vision and Graphics", 4);
// const ES645 = new Course("ES 645", "Optimization Methods for Machine Learning", 4);
// const ES659 = new Course("ES 659", "Computer Graphics", 4);
// const ES661 = new Course("ES 661", "Probabilistic Machine Learning", 4);
// const ES666 = new Course("ES 666", "Computer Vision", 4);
// const ES667 = new Course("ES 667", "Deep Learning", 4);
// const ES669 = new Course("ES 669", "Advanced Computer Architecture and Systems", 4);
// const ES670 = new Course("ES 670", "Matrix Methods for Signal Processing, Data Science, and Machine Learning", 4);
// const ES676 = new Course("ES 676", "Classical Information Theory", 4);

// Theory & Algorithms Basket
const ES301 = new Course("ES 301", "Data Structures & Algorithms II", 4, "Theory & Algorithms Basket");
const CS614 = new Course("CS 614", "Advanced Algorithms", 4, "Theory & Algorithms Basket");
const CS617 = new Course("CS 617", "Computational Complexity Theory", 4, "Theory & Algorithms Basket");
// const CS328 = new Course("CS 328", "Introduction to Data Science", 4, "Theory & Algorithms Basket");

// Systems Basket
// const CS327 = new Course("CS 327", "Compilers", 5, "Systems Basket");
const CS332 = new Course("CS 332", "Principles of Programming Languages", "TBD", "Systems Basket");
const CS431 = new Course("CS 431", "Computer and Network Security", 4, "Systems Basket");
// const CS432 = new Course("CS 432", "Databases", 4, "Systems Basket");
const CS434 = new Course("CS 434", "Software Engineering and Testing", 4, "Systems Basket");
const CS435 = new Course("CS 435", "Human–Computer Interaction", 4, "Systems Basket");
const CS615 = new Course("CS 615", "Advanced Networks", 4, "Systems Basket");
const CS616 = new Course("CS 616", "Parallel and Distributed Systems", 5, "Systems Basket");
const ES668 = new Course("ES 668", "5G and Beyond", 4, "Systems Basket");

    if (discipline === "CSE") {
        courses["Discipline Core Courses"] = [ES242, ES214, ES204, ES215,
    CS201, CS301, CS202, CS329, CS331];
        courses["Discipline Electives"] = [ES335, ES404, ES615, ES627, ES637, ES645, ES659,
    ES661, ES666, ES667, ES669, ES670, ES676,
    ES301, CS614, CS617, CS328,
    CS327, CS332, CS431, CS432, CS434, CS435,
    CS615, CS616, ES668];
    }

// EE
// Discipline Core Courses

const ES244 = new Course("ES 244", "Signals, Systems, and Random Processes", 4);
const EE226 = new Course("EE 226", "Semiconductor Devices", 4);
const EE331 = new Course("EE 331", "Electrical Machines", 4);
const EE332 = new Course("EE 332", "Power Systems", 4);
const EE333 = new Course("EE 333", "Power Electronics", 4);
// const ES204 = new Course("ES 204", "Digital Systems", 4);
const EE312 = new Course("EE 312", "Engineering Electromagnetics", 4);
const EE313 = new Course("EE 313", "Communication Systems", 3);
// const EE323 = new Course("EE 323", "Digital Signal Processing", 4);
const EE322 = new Course("EE 322", "Analog & Mixed Signal Circuits", 4);
const ES245 = new Course("ES 245", "Control Systems", 4);

// Discipline Electives

// const CS436 = new Course("CS 436", "History of Computing and its Applications to Domains", 2);
// const ES215 = new Course("ES 215", "Computer Organization and Architecture", 4);
const ES333 = new Course("ES 333", "Microprocessors and Embedded Systems", 4);
const ES412 = new Course("ES 412", "Optical Fiber Communication", 4);
const ES414 = new Course("ES 414", "Introduction to Photonics", 4);
const ES416 = new Course("ES 416", "Space Science and Satellite Technology", 4);
const ES408 = new Course("ES 408", "Mechatronics", 4);
const ES612 = new Course("ES 612", "Artificial Intelligence", 4);
const ES613 = new Course("ES 613", "Modern Control Theory", 4);
// const ES615 = new Course("ES 615", "Nature Inspired Computing", 4);
const ES616 = new Course("ES 616", "Digital Control Systems", 4);
const ES625 = new Course("ES 625", "Optical Communications", 4);
const ES626 = new Course("ES 626", "Microfabrication and Semiconductor Processes", 4);
// const ES637 = new Course("ES 637", "Mathematical Foundations for Computer Vision and Graphics", 4);
const ES641 = new Course("ES 641", "Electronic Instrumentation", 4);
const ES642 = new Course("ES 642", "Control of Nonlinear Dynamical Systems", 4);
const ES655 = new Course("ES 655", "Medical Imaging Systems", 4);
const ES656 = new Course("ES 656", "Human-Robot Interaction", 4);
const ES657 = new Course("ES 657", "Biomedical Ultrasound", 4);
// const ES659 = new Course("ES 659", "Computer Graphics", 4);
// const ES662 = new Course("ES 662", "Flexible Electronics: Materials, Methods and Devices", 4);
const ES663 = new Course("ES 663", "Smart Renewable Energy Systems", 4);
const ES665 = new Course("ES 665", "Advanced Transportation Electrification Technology", 4);
// const ES666 = new Course("ES 666", "Computer Vision", 4);
// const ES667 = new Course("ES 667", "Deep Learning", 4);
// const ES668 = new Course("ES 668", "5G and Beyond", 4);
// const ES669 = new Course("ES 669", "Advanced Computer Architecture and Systems", 4);
// const ES670 = new Course("ES 670", "Matrix Methods for Signal Processing, Data Science, and Machine Learning", 4);
const ES675 = new Course("ES 675", "Photonics – Principles and Applications", 4);
// const ES676 = new Course("ES 676", "Classical Information Theory", 4);
const PH643 = new Course("PH 643", "Quantum Computing and Information", 4);

    if (discipline === "EE") {
        courses["Discipline Core Courses"] = [ES244, EE226, EE331, EE332, EE333,
    ES204, EE312, EE313, EE323, EE322, ES245];

        courses["Discipline Electives"] = [CS436, ES215, ES333, ES412, ES414, ES416, ES408,
    ES612, ES613, ES615, ES616, ES625, ES626, ES637,
    ES641, ES642, ES655, ES656, ES657, ES659, ES662,
    ES663, ES665, ES666, ES667, ES668, ES669, ES670,
    ES675, ES676, PH643];
    }

// ICDT
// Discipline Core Courses
// const ES244 = new Course("ES 244", "Signals, Systems, and Random Processes", 4);
// const EE226 = new Course("EE 226", "Semiconductor Devices", 4);
// const ES215 = new Course("ES 215", "Computer Organization & Architecture", 4);
// const ES204 = new Course("ES 204", "Digital Systems", 4);
// const EE322 = new Course("EE 322", "Analog & Mixed Signal Circuits", 4);
// const EE226 = new Course("EE 226", "Semiconductor Devices", 4);
const EE225 = new Course("EE 225", "Unveiling the Semiconductor World", 2);
const EE227 = new Course("EE 225", "CMOS Circuit Design", 4);
const SemiconductorCharacterization = new Course("TBD", "Semiconductor Material & Device Characterization", 4);
const ICFabrication = new Course("TBD", "IC Fabrication & Manufacturing", 4);
const ThinFilmTech = new Course("TBD", "Thin Film Science & Vacuum Technology", 4);
const PackageAssembly = new Course("TBD", "Semiconductor Package Assembly & Manufacturing", 4);
const ES339 = new Course("ES 339", "IC Fabrication Lab", 2);

// Discipline Electives
// const CS436 = new Course("CS 436", "History of Computing and its Applications to Domains", 2);
const EE651 = new Course("EE 651", "CMOS Analog IC Design", 6);
const EE660 = new Course("EE 660", "Power Management IC Design", 4);
const ES246 = new Course("ES 246", "Vacuum Technology Laboratory", 2);
const ES672 = new Course("ES 672", "Semiconductor Packaging", 4);

const AdvancedSemiconductorManufacturing = new Course("TBD", "Advanced Semiconductor Manufacturing", "TBD");
const CompoundSemiconductorDevices = new Course("TBD", "Compound Semiconductor Devices & Circuits", "TBD");
const DesignForTest = new Course("TBD", "Design for Test", "TBD");
const DisplayTechnology = new Course("TBD", "Display Technology and Manufacturing", "TBD");
const FundamentalsMEMS = new Course("TBD", "Fundamentals of MEMS/NEMS", "TBD");
const ManufacturingProcessControl = new Course("TBD", "Manufacturing Process Control", "TBD");
const MemoryDevices = new Course("TBD", "Memory Devices, Circuits & Systems", "TBD");
const NanoscaleDevices = new Course("TBD", "Nanoscale Devices", "TBD");
const SolarCells = new Course("TBD", "Physics and Manufacturing of Solar Cells", "TBD");
const PowerSemiconductorDevices = new Course("TBD", "Power Semiconductor Devices", "TBD");
const RFICDesign = new Course("TBD", "RF IC Design", "TBD");
const VLSIPhysicalDesign = new Course("TBD", "VLSI Physical Design: Netlist to GDSII", "TBD");

    if (discipline === "ICDT") {
        courses["Discipline Core Courses"] = [ES244, EE226, ES215, ES204, EE322, EE226, EE225, EE227, SemiconductorCharacterization,
        ICFabrication, ThinFilmTech, PackageAssembly, ES339];

        courses["Discipline Electives"] = [CS436, EE651, EE660, ES246, ES672,
    AdvancedSemiconductorManufacturing, CompoundSemiconductorDevices,
    DesignForTest, DisplayTechnology, FundamentalsMEMS,
    ManufacturingProcessControl, MemoryDevices, NanoscaleDevices,
    SolarCells, PowerSemiconductorDevices, RFICDesign, VLSIPhysicalDesign];
    }

// MSE
// Discipline Core Courses
const MSE207 = new Course("MSE 207", "Structure of Materials", 4);
const MSE202 = new Course("MSE 202", "Materials Thermodynamics", 4);
const MSE204 = new Course("MSE 204", "Transport Phenomena in Materials Engineering", 4);
const MSE201 = new Course("MSE 201", "Microstructural Engineering", 4);
const MSE206 = new Course("MSE 206", "Physics of Materials", 4);
const ICME = new Course("TBD", "Integrated Computational Materials Engineering", 4);
const MSE205 = new Course("MSE 205", "Mechanical Behaviour of Materials", 4);
const MSE313 = new Course("MSE 313", "Polymers, Ceramics and Composites", 4);
const MSE307 = new Course("MSE 307", "Materials Processing", 4);
const Corrosion = new Course("TBD", "Corrosion & Degradation of Materials", 4);
const MaterialsEnvironment = new Course("TBD", "Materials & Environment", 2);

// Discipline Electives
const ES415 = new Course("ES 415", "Nature-inspired Materials Design", 4)
const ES623 = new Course("ES 623", "Biomolecular Materials Science", 4)
const MSE355 = new Course("MSE 355", "Surface Engineering", 4);
const MSE401 = new Course("MSE 401", "Introduction to Polymer Physics and Processing", 4);
const MSE402 = new Course("MSE 402", "Computational Process Design", 4);
const MSE403 = new Course("MSE 403", "Science and Technology of Welding and Joining", 4);
const MSE404 = new Course("MSE 404", "Diffraction Methods for Structure and Stress Analysis", 4);
const MSE604 = new Course("MSE 404", "Deformation Behaviour of Materials", 4);
const MSE603 = new Course("MSE 603", "Thin Film Processing and Characterization", 4);
const MSE605 = new Course("MSE 605", "Biomaterials for Tissue Regeneration", 4);
const MSE621 = new Course("MSE 621", "Process Plant Design – How to Set Up a Process Industry", 4);
const MSE622 = new Course("MSE 622", "Process Plant Design – How to Set Up a Process Industry", 4);
const MSE210 = new Course("MSE 210", "Microstructural Engineering", 4);

const MSE209 = new Course("MSE 209", "Material Thermodynamics and Kinetics", 4);
const MSE631 = new Course("MSE 631", "Thermodynamics of Materials", 4);
const MSE625 = new Course("MSE 625", "Thermodynamics of Thin Film Growth", 4);

const MSE203 = new Course("MSE 203", "Introduction to Computational Materials Engineering", 4);
const MSE315 = new Course("MSE 315", "Introduction to Computational Materials Engineering", 4);

const MSE311 = new Course("MSE 311", "Transport Phenomena in Materials Engineering", 4);

const MSE303 = new Course("MSE 303", "Mechanical Behaviour of Materials", 4);

const MSE310 = new Course("MSE 310", "Physics of Materials", 4);

const MSSE207 = new Course("MSE 207", "Structure of Materials", 4);
const MSE629 = new Course("MSE 629", "Structure and Defects of Materials", 4);

const MSE211 = new Course("MSE 211", "Material Characterization Techniques", 3);
const MSE352 = new Course("MSE 352", "Material Characterization Techniques", 4);
const MSE632 = new Course("MSE 632", "Characterization of Materials", 4);
const MSE633 = new Course("MSE 633", "Transmission Electron Microscopy", 5);

const MSE302 = new Course("MSE 302", "Corrosion and Degradation of Materials", 4);
const MSE316 = new Course("MSE 316", "Corrosion and Degradation of Materials", 4);

const MSE304 = new Course("MSE 304", "Principles of Metal Extraction and Refining", 4);
const MSE305 = new Course("MSE 305", "Advanced Materials", 4);
const MSE628 = new Course("MSE 628", "Advanced Engineering Materials", 4);

const MSE306 = new Course("MSE 306", "Design, Selection and Processing of Engineering Alloys", 2);

const MSE317 = new Course("MSE 317", "Materials Processing (lab variant)", 4);

const MSE318 = new Course("MSE 318", "Introduction to Quantum Materials and Devices", 3);
const MSE354 = new Course("MSE 354", "Heat Treatment of Alloys", 2);

const MSE312 = new Course("MSE 312", "Materials and Environment", 2);
const MSE314 = new Course("MSE 314", "Materials Selection and Design", 3);

const MSE624 = new Course("MSE 624", "Thermo-mechanical Processing", 4);
const MSE626 = new Course("MSE 626", "Light Metal Alloys for Automotive Industry", 4);
const MSE627 = new Course("MSE 627", "Interfaces in Materials", 4);
const MSE630 = new Course("MSE 630", "Kinetics of Materials", 4);

const MSE634 = new Course("MSE 634", "Semiconductor Materials and Fabrication Process", 4);
const MSE635 = new Course("MSE 635", "Advanced Alloy Design and Processing", 4);

const MSE636 = new Course("AI for Materials Engineering", "AI for Materials Engineering", 4);

    if (discipline === "MSE") {
        courses["Discipline Core Courses"] = [MSE207, MSE202, MSE204, MSE201, MSE206,
    ICME, MSE205, MSE313, MSE307, Corrosion, MaterialsEnvironment]

        courses["Discipline Electives"] = [ES415, ES623, MSE203, MSE209, MSE210, MSE302, 
            MSE303, MSE304, MSE305, MSE306, MSE310, MSE311, MSE312, MSE314, MSE315, 
            MSE316, MSE317, MSE318, MSE352, MSE354, MSE355, MSE401, MSE402, MSE403, 
            MSE404, MSE603, MSE604, MSE605, MSE621, MSE622, MSE624, MSE625, MSE626, 
            MSE627, MSE628, MSE629, MSE630, MSE631, MSE631, MSE633, MSE632, MSE634, MSE635, MSE636];
    }

// ME
// Discipline Core Courses
// const ES211 = new Course("ES211", "Thermodynamics", 3);
const ME206 = new Course("ME 206", "Statics & Dynamics", 4);
const ME207 = new Course("ME 207", "Fluid Dynamics", 5);
// const ES221 = new Course("ES221", "Mechanics of Solids", 4);
const ME209 = new Course("ME 209", "Principles of Manufacturing Processes", 3);
const ME208 = new Course("ME 208", "Vibrations", 2);
const ME334 = new Course("ME 334", "Heat and Mass Transfer", 4);
const ME362 = new Course("ME 362", "Introduction to Manufacturing Systems & Metrology", 3);
const ME333 = new Course("ME 333", "Mechanics of Materials", 3);
// const ES245 = new Course("ES245", "Control Systems", 4);
const ME322 = new Course("ME 322", "Synthesis and Analysis of Mechanisms", 3);
const ME337 = new Course("ME 337", "Mechanical Systems Design", 3);
const ES337 = new Course("ES 337", "Energy Systems", 3);

// Discipline Electives


//const CL324 = new Course("CL324", "Introduction to Polymer Science and Engineering", 4);
//const CS435 = new Course("CS435", "Human-Computer Interaction", 4);
//const ES214 = new Course("ES214", "Discrete Mathematics", 4);
//const ES408 = new Course("ES408", "Mechatronics", 4);
//const ES604 = new Course("ES604", "Engineering Optimization", 4);
//const ES607 = new Course("ES607", "Foundations of Fluid Dynamics", 4);
//const ES613 = new Course("ES613", "Modern Control Theory", 4);
//const ES616 = new Course("ES616", "Digital Control Systems", 4);
//const ES621 = new Course("ES621", "Advanced Solid Mechanics", 4);
//const ES622 = new Course("ES622", "Finite Element Methods", 4);
const ES631 = new Course("ES 631", "Advanced Heat Transfer", 3);
const ES632 = new Course("ES 632", "Energy Systems", 4);
//const ES641 = new Course("ES641", "Electronic Instrumentation", 4);
//const ES642 = new Course("ES642", "Control of Nonlinear Dynamical Systems", 4);
//const ES646 = new Course("ES646", "Elastodynamics and Vibrations", 4);
//const ES648 = new Course("ES648", "Nonlinear Dynamics and Vibrations", 4);
//const ES653 = new Course("ES653", "Nonlinear Continuum Mechanics", 4);
//const ES656 = new Course("ES656", "Human-Robot Interaction", 4);
//const MSE313 = new Course("MSE313", "Polymers, Ceramics & Composites", "TBD");
//const MSE632 = new Course("MSE632", "Characterization of Materials", "TBD");


    if (discipline === "ME") {
        courses["Discipline Core Courses"] = [ES211, ME206, ME207, ME208, ME209, ES221, 
            ME334, ME333, ME362, ES245, ME322, ME337, ES337];

        courses["Discipline Electives"] = [CL324, CS435, ES214, ES408, ES607, ES604,
            ES641, ES642, MSE313, MSE632, ES646, ES648, ES653, ES656, ES621, ES622,
            ES631, ES632, ES613, ES616];
    }

    
// Science Basket

const PH201 = new Course("PH 201", "Introduction to Electrodynamics", 4);
const PH202 = new Course("PH 202", "Introduction to Quantum Physics", 4);
const PH203 = new Course("PH 203", "Solid State Physics", 4);
const PH404 = new Course("PH 404", "Molecular and Crystal Physics", 4);
const PH503 = new Course("PH 503", "Quantum Mechanics I", 4);
const PH505 = new Course("PH 505", "Classical Electrodynamics", 4);
const PH507 = new Course("PH 507", "Statistical Mechanics", 4);
const PH508 = new Course("PH 508", "Classical Mechanics", 4);
const PH509 = new Course("PH 509", "Computational Physics", 4);
const PH510 = new Course("PH 510", "Condensed Matter Physics", 4);

const CH203 = new Course("CH 203", "Fundamentals and Applications of Spectroscopy", 4);
const CH204 = new Course("CH 204", "Organic Chemistry in Everyday Life", 4);
const CH302 = new Course("CH 302", "Electrochemical Science and Engineering", 4);
const CH401 = new Course("CH 401", "Food Chemistry", 4);
const CH511 = new Course("CH 511", "Quantum Chemistry", 4);

const CG503 = new Course("CG 503", "Fundamentals of Cognitive Psychology", 4);
const CG505 = new Course("CG 505", "Fundamental Neuroscience", 4);

const EH303 = new Course("EH 303", "Introduction to Earth Sciences", 4);
const EH304 = new Course("EH 304", "Drone Data Acquisition Processing and Interpretation", 2);
const EH601 = new Course("EH 601", "Earth Surface Processes", 4);
const EH602 = new Course("EH 602", "River Morphology and Ecology", 4);
const EH605 = new Course("EH 605", "Modeling of Earth System and Sustainability", 4);
const EH608 = new Course("EH 608", "Biodiversity Conservation and Sustainable Development", 4);
const EH611 = new Course("EH 611", "Near Surface Geophysics", 4);
const EH612 = new Course("EH 612", "Ocean and Global Change", 4);
const EH619 = new Course("EH 619", "Geobiology", 4);
const EH621 = new Course("EH 621", "Climate of the Past", 4);

courses["Science Basket"] = [PH201, PH202, PH203, PH404, PH503, PH505,  
  PH507, PH508, PH509, PH510, CH203, CH204, CH302, CH401, CH511, 
  CG503, CG505, EH303, EH304, EH601, EH602, EH605, EH608, EH611, EH612, EH619, EH621];

// Math Basket
const MA204 = new Course("MA 204", "Introduction to Partial Differential Equations", 2);
const MA205 = new Course("MA 205", "Calculus of Several VAriables", 2);
const MA206 = new Course("MA 206", "Introduction to Complex Analysis", 2);

courses["Math Basket"] = [MA204, MA205, MA206];

// Materials Basket
const ES118 = new Course("ES 118", "Materials for the Future", 3);
// MSE211
// MSE314

courses["Materials Basket"] = [ES118, MSE211, MSE314];

// HSS Basket
const HS191 = new Course("HS 191", "Introduction to Writing I", 2);
const HS192 = new Course("HS 192", "Introduction to Writing II", 2);
const HS151 = new Course("HS 151", "Economics", 4);
const GE101 = new Course("GE 101", "General Education I", 2);
const GE201 = new Course("GE 201", "General Education II", 2);

courses["HSS Basket"] = [HS191, HS192, HS151, GE101, GE201];
courses["Open Electives"] = Course.allCourses;
return (courses);


}
